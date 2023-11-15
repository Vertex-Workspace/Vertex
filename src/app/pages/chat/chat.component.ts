import { Component } from '@angular/core';
import { faChevronRight,faPaperPlane,
  faMicrophoneLines,faPaperclip,
  faCheckDouble,faUsers,faUser,faGlobe,
  faMinimize,faStar,faCircleUser,faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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

  rota:String = window.location.href;
  rotaChat:String = "http://localhost:4200/chat";

  constructor(private router:Router){}


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
      ]
    },
    {
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ]
    },{
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ]
    },{
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ]
    },{
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ]
    },{
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ]
    },{
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ]
    },{
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ]
    },{
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ]
    },{
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ]
    },{
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ]
    },{
      name: 'John Doe',
      status: 'online',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      messages: [
        {
          content: 'Hello',
          time: '12:10'
        },

        {
          content: 'How are you?',
          time: '12:10'
        }
      ]
    },
  ]

  minimizeChat(){
    let rotaAntiga = window.localStorage.getItem('rota');
    console.log(rotaAntiga);
    
    this.rota = rotaAntiga!;
    this.router.navigate([this.rota]);
  }

  // userMessages = [
  //   {
  //     content: 'Boa tarde! Criei uma tarefa nova!',
  //     time: '12:10'
  //   },
  //   {
  //     content: 'Ela está dentro do projeto Vertex. Coloquei como prazo, 13 de setembro de 2023.',
  //     time: '12:11'
  //   },
  //   {
  //     content: 'Ok. Já estarei mudando isso.',
  //     time: '06:59'
  //   },
  // ]

  // answers = [
  //   {
  //     content: 'OK. Começarei a trabalhar nela amanhã.',
  //     time: '12:13'
  //   },
  //   {
  //     content: 'Já verifiquei e percebi que não tenho uma permissão para editá-la.',
  //     time: '06:37'
  //   }
  // ]


}
