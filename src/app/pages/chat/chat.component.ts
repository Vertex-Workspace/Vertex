import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  faChevronRight, faPaperPlane,
  faMicrophoneLines, faPaperclip,
  faCheckDouble, faUsers, faUser, faGlobe,
  faMinimize, faStar, faCircleUser, faSearch,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { WebSocketService } from 'src/app/services/websocket.service';
import { Chat } from '../../models/chat';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Message } from 'src/app/models/message';
import { TeamService } from '../../services/team.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  faSearch = faSearch;
  faCircleUser = faCircleUser;
  faStar = faStar;
  faMinimize = faMinimize;
  faGlobe = faGlobe;
  faUser = faUser;
  faUsers = faUsers;
  faCheckDouble = faCheckDouble;
  faPaperclip = faPaperclip;
  faMicrophoneLines = faMicrophoneLines;
  faChevronRight = faChevronRight;
  faPaperPlane = faPaperPlane;
  faTimes = faTimes;

  messageUser: any = "";
  @Output()
  chatExpanded: EventEmitter<boolean> = new EventEmitter<boolean>();

  conversationOpen: boolean = false;

  conversations: Chat[] = []

  messages: Message[] = [];

  chat!: Chat;

  cardChat: number = 0;

  side: boolean = true;

  logged!: User;


  constructor(public webSocketService: WebSocketService, private teamService: TeamService) {

    this.logged = JSON.parse(localStorage.getItem('logged') || '{}');
    this.teamService.findAllChats().subscribe((chats: Chat[]) => {
      chats.forEach((chat: Chat) => {

        this.chat = chat;
        console.log(this.logged, "Logged");
        chat.userTeams!.forEach((userTeam) => {
          if (userTeam.user.id == this.logged.id) {
            this.conversations.push(chat);
          }
        });

        console.log(chat, "Chat");

        console.log(this.conversations);

      });
    });

  }

  click() {
    this.side = !this.side;
  }

  ngOnInit() {
    
      this.webSocketService.listenToServer().subscribe((change) => {
        console.log(change, "Change")
        this.chat.messages!.push(change);
      });
    
  }

  // ngOnDestroy(): void {
  //   this.webSocketService.closeWebSocket();
  // }

  sendMessage(sendForm: NgForm,event:any) {
    let date = new Date();
    let dateString = date.toISOString();

    this.logged = JSON.parse(localStorage.getItem('logged') || '{}');

    const messageDto: Message = {
      user: this.logged.firstName,
      contentMessage: this.messageUser,
      time: dateString,
      viewed: false,
    };
    console.log(messageDto);

    if (messageDto.contentMessage != null && messageDto.contentMessage.trim() != "") {
      this.teamService.patchMessagesOnChat(this.chat.id!, this.logged.id!, messageDto).subscribe(
        (response: any) => {
          this.chat = response;
          console.log(response, "Message sentALLL");
          sendForm.controls['message'].reset();
        });

      this.webSocketService.sendMessage(messageDto);
      setTimeout(() => {
        let a = document.getElementsByClassName("center-div")[0] as HTMLElement;
        a.scrollTop = a.scrollHeight;
      }, 0);
      sendForm.reset();
    }
  }

  

  openConversation(chat: Chat) {
    this.chat = chat;
    // this.conversations[this.cardChat].conversationOpen = false;
    // this.conversations[i].conversationOpen = true;
    // this.cardChat = i;

    this.teamService.findAllMessagesByChatId(chat.id!).subscribe((messages: Message[]) => {
      this.chat.messages = messages;
      console.log(this.chat, "Messages");

      let a = document.getElementsByClassName("center-div")[0] as HTMLElement;
      a.scrollTo(a.scrollTop, a.scrollHeight);
    });
  }

  minimizeChat(value: boolean) {
    this.chatExpanded.emit(value);
  }


}
