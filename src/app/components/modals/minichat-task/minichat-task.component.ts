import { Component, EventEmitter, Output } from '@angular/core';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip, faMicrophoneLines,
        faCircleUser, faCheckDouble, faStar,faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-minichat-task',
  templateUrl: './minichat-task.component.html',
  styleUrls: ['./minichat-task.component.scss']
})
export class MinichatTASKComponent {
  faMessage = faMessage;
  faTimes = faTimes;
  faUser = faUser;
  faExpand = faExpand;
  faPaperPlane = faPaperPlane;
  faPaperclip = faPaperclip;
  faMicrophoneLines = faMicrophoneLines;
  faCircleUser = faCircleUser;
  faCheckDouble = faCheckDouble;
  faStar = faStar;
  faArrowLeft = faArrowLeft;

  messageUser: any = " ";
  side: boolean = true;

  @Output() miniChatOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() chatExpanded: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },
  ]

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
      let hora = new Date().getHours() + ":" + new Date().getMinutes();
      if (new Date().getMinutes() < 10) {
        hora = new Date().getHours() + ":0" + new Date().getMinutes();
      }

      this.messageUser = {
        id: this.messages.length + 1,
        content: this.messageUser,
        time: hora
      }

      this.messages.push(this.messageUser)
      this.side = !this.side;
      this.messageUser = '';
    }
  }

  expandChat(value: boolean) {
    this.chatExpanded.emit(value);
  }

  openMiniChat(value: boolean) {
    this.miniChatOpen.emit(value);
  }
}
