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

  cardChat: number = 0;

  side: boolean = true;

  logged!: User;

  constructor(public webSocketService: WebSocketService) {
    this.logged = JSON.parse(localStorage.getItem('logged') || '{}');
  }

  clcik() {
    this.side = !this.side;
  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new Chat(this.logged.firstName!, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDto);
    sendForm.controls['message'].reset();
  }

  users = [
    {
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ],
      conversationOpen: false
    }
  ]

  openConversation(i: number) {
    this.users[this.cardChat].conversationOpen = false;
    this.users[i].conversationOpen = true;
    this.cardChat = i;
  }

  minimizeChat(value: boolean) {
    this.chatExpanded.emit(value);
  }

  messages = [
    {
      id: 1,
      content: 'Hello',
      time: '12:10'
    }
  ]

  submit() {
    console.log(this.messageUser);

    if (this.messageUser != "") {
      console.log(this.messageUser);

      let hora = new Date().getHours() + ":" + new Date().getMinutes();
      if (new Date().getMinutes() < 10) {
        hora = new Date().getHours() + ":0" + new Date().getMinutes();
      }

      this.messageUser = {
        id: this.messages.length + 1,
        content: this.messageUser,
        time: hora
      }

      console.log(this.messageUser.id);

      this.messages.push(this.messageUser)
      this.side = !this.side;
      this.messageUser = '';
    }
  }
}
