import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faMinimize } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
    },
  ]

  userMessages = [
    {
      content: 'Boa tarde! Criei uma tarefa nova!',
      time: '12:10'
    },
    {
      content: 'Ela está dentro do projeto Vertex. Coloquei como prazo, 13 de setembro de 2023.',
      time: '12:11'
    },
    {
      content: 'Ok. Já estarei mudando isso.',
      time: '06:59'
    },
  ]

  answers = [
    {
      content: 'OK. Começarei a trabalhar nela amanhã.',
      time: '12:13'
    },
    {
      content: 'Já verifiquei e percebi que não tenho uma permissão para editá-la.',
      time: '06:37'
    }
  ]


}
