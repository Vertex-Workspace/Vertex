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
import { PersonalizationService } from 'src/app/services/personalization.service';
import { UserService } from 'src/app/services/user.service';

import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],

})
export class ChatComponent {

  faCommentSlash = faCommentSlash;
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

  hasAnyChat: boolean = false;

  logged!: User;


  constructor(
    public webSocketService: WebSocketService, 
    private teamService: TeamService,
    private userService : UserService) {
    this.logged = userService.getLogged();
    this.teamService.findAllChats().subscribe((chats: Chat[]) => {
      chats.forEach((chat: Chat) => {
        console.log(chat);
        
        chat.userTeams!.forEach((userTeam) => {
          if (userTeam.user.id == this.logged.id) {
            if (chat.userTeams!.length > 1) {
              this.hasAnyChat = true;
              this.conversations.push(chat);
            }
            else {
              this.hasAnyChat = false;
              this.conversations=[];
            }
          }
        });
      });
    });

    console.log(this.conversations);
    
  }

  showEmojiPicker: boolean = false;
  showEmoji(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  ngOnInit() {
    this.webSocketService.listenToServer().subscribe((change) => {
      this.chat.messages!.push(change);
      setTimeout(() => {
        let a = document.getElementsByClassName("center-div")[0] as HTMLElement;
        a.scrollTop = a.scrollHeight;
      }, 0);
    });
  }

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
  url !: any;
  onFileChange(e: any) {
    this.selectedFile = e.target.files[0];
    const fd: FormData = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('user', this.logged.firstName!);

    this.teamService.patchArchiveOnChat(this.chat.id!, fd).subscribe(
      (response: any) => {
        // this.chat.messages?.push(response);
        let reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          let message: Message = {
            user: this.logged.firstName,
            contentMessage: this.selectedFile.name,
            time: new Date(),
            file: reader.result,
            viewed: false,
          };
          this.webSocketService.sendMessage(message);
        };
      }
    );
  }

  messageFileIncludesImage(message: any): boolean {
    if (message.file && message.file.type && typeof message.file.type === 'string') {
      return message.file.type.includes('image');
    }
    return false;
  }

  convertDataUrlToBlob(dataUrl: string) {
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  getIconSrc(message: any): string {
    const fileTypeIcons: Record<string, string> = {
      'application/pdf': 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
      'text/plain': 'https://cdn-icons-png.freepik.com/512/8243/8243060.png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'https://cdn-icons-png.freepik.com/256/8361/8361174.png?uid=R112263958&ga=GA1.1.310772085.1710953572&',
      'video/mp4': 'https://cdn-icons-png.freepik.com/512/8243/8243015.png',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'https://cdn-icons-png.freepik.com/512/8361/8361467.png',
      'application/vnd.ms-excel': 'https://cdn-icons-png.freepik.com/512/8361/8361467.png',
      'text/csv': 'https://cdn-icons-png.freepik.com/512/8242/8242984.png'
    };
    if (typeof message.file == "string") {
      message.file = this.convertDataUrlToBlob(message.file);
    }

    const iconSrc = fileTypeIcons[message.file.type];
    if (iconSrc) {
      return iconSrc;
    }
    else {
      if (message.file instanceof Blob) {
        return URL.createObjectURL(message.file);
      }
      return `data:image/jpg;base64,${message.file.file}`
    };
  }

  convertBlobToFile(blob: Blob, fileName: string): File {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  changeUrlOfArchive(response: Message) {
    if (response.file instanceof Blob) {
      response.file = this.convertBlobToFile(response.file, response.contentMessage! as string);
      return window.URL.createObjectURL(response.file);
    } else {
      const byteCharacters = atob(response.file.file);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      return window.URL.createObjectURL(blob);
    }
  }

  generateTime(message: Message) {
    return new Date(message.time!).toLocaleString();
  }

  m:Message[]= new Array(0);
  openConversation(chat: Chat) {
    this.chat = chat;
    this.conversations.forEach((conversation: Chat) => {
      conversation.conversationOpen = false;
    });
    
    this.chat.conversationOpen = true;

    this.teamService.findAllMessagesByChatId(chat.id!).subscribe((messages: Message[]) => {
      this.chat.messages = messages;

      setTimeout(() => {
        let a = document.getElementsByClassName("center-div")[0] as HTMLElement;
        a.scrollTop = a.scrollHeight;
      }, 0);
    });
  }
  
  minimizeChat(value: boolean) {
    this.chatExpanded.emit(value);
  }
}