import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  faChevronRight, faPaperPlane,
  faMicrophoneLines, faPaperclip,
  faCheckDouble, faUsers, faUser, faGlobe,
  faMinimize, faStar, faCircleUser, faSearch,
  faTimes, faSmile
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { WebSocketService } from 'src/app/services/websocket.service';
import { Chat } from '../../models/class/chat';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/class/user';
import { Message } from 'src/app/models/class/message';
import { TeamService } from '../../services/team.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],

})
export class ChatComponent {

  faSmile = faSmile;
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
        chat.userTeams!.forEach((userTeam) => {
          if (userTeam.user.id == this.logged.id) {
            this.conversations.push(chat);
          }
        });

      });
    });

  }

  showEmojiPicker: boolean = false;
  showEmoji(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  click() {
    this.side = !this.side;
  }

  ngOnInit() {
    console.log(this.chat)
    this.webSocketService.listenToServer().subscribe((change) => {
      console.log(change, "Change")
      this.chat.messages!.push(change);
      setTimeout(() => {
        let a = document.getElementsByClassName("center-div")[0] as HTMLElement;
        a.scrollTop = a.scrollHeight;
      }, 0);
    });

  }

  // To-do: update the style of the chat component.

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  addEmoji(event: any) {
    this.messageUser += event.emoji.native;
  }




  sendMessage(sendForm: NgForm) {
    this.logged = JSON.parse(localStorage.getItem('logged') || '{}');


    const messageDto: Message = {
      user: this.logged.firstName,
      contentMessage: this.messageUser,
      time: new Date(),
      viewed: false,
    };
    console.log(messageDto);

    this.showEmojiPicker = false;

    if (messageDto.contentMessage != null && messageDto.contentMessage.trim() != "") {
      this.teamService.patchMessagesOnChat(this.chat.id!, this.logged.id!, messageDto).subscribe(
        (response: any) => {
          this.chat = response;
          console.log(response, "Message sentALLL");
          sendForm.controls['message'].reset();
        });

      this.webSocketService.sendMessage(messageDto);

      sendForm.reset();
    }
  }



  openFile() {
    let a = document.getElementById('fileInput') as HTMLElement;
    a.click();
  }
  selectedFile!: any;
  isPdfOrDocx: boolean = false;
  url !: string;
  onFileChange(e: any) {
    this.selectedFile = e.target.files[0];
    const fd: FormData = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('user', this.logged.firstName!);

    this.teamService.patchArchiveOnChat(this.chat.id!, fd).subscribe(
      (response: any) => {
        this.chat = response;
        console.log(response, "ARCHIVE SENT DB");
      }
    );

    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      let base64Data = reader.result as string;
      console.log(base64Data, "BASE64");
      
      if (base64Data.includes("data:application/pdf;base64,")){
        base64Data = base64Data.replace("data:application/pdf;base64,", "");
        this.isPdfOrDocx = true;
      }else if(base64Data.includes("data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,")){
        base64Data = base64Data.replace("data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,", "");
        this.isPdfOrDocx = true;
      }
       else {
        this.isPdfOrDocx = false;
        const base64Parts = base64Data.split(',');
        if (base64Parts.length === 2) {
          base64Data = base64Parts[1];
        }
      }
      let message: Message = {
        user: this.logged.firstName,
        time: new Date(),
        imageUser: this.logged.image,
        file: base64Data,
        viewed: false,
      };
      this.webSocketService.sendMessage(message);
    };
  }

  generateTime(message: Message) {
    let minutes = new Date(message.time!).getMinutes();
    if (minutes < 10) {
      return new Date(message.time!).getHours() + ":0" + new Date(message.time!).getMinutes();
    }else return new Date(message.time!).getHours() + ":" + new Date(message.time!).getMinutes();
  }

  transformHexColorToSimilarColor(hex: string) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r},${g},${b},0.5)`;
  }

  openConversation(chat: Chat) {

    this.chat = chat;
    this.conversations.forEach((conversation: Chat) => {
      conversation.conversationOpen = false;
    });

    this.chat.conversationOpen = true;


    this.teamService.findAllMessagesByChatId(chat.id!).subscribe((messages: Message[]) => {
      this.chat.messages = messages;

      this.chat.messages!.forEach((message: Message) => {
        if (message.user == this.logged.firstName) {
          message.viewed = true;
        }
      });
      console.log(this.chat, "Messages");

      let a = document.getElementsByClassName("center-div")[0] as HTMLElement;
      a.scrollTo(a.scrollTop, a.scrollHeight);
    });
  }

  minimizeChat(value: boolean) {
    this.chatExpanded.emit(value);
  }


}
