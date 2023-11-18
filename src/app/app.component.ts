import { Component, Input, OnInit, Output } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterLink, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { PersonalizationService } from './services/personalization.service';
import { faMessage, faBell } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip,faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent{
[x: string]: any;
  title = 'Vertex';
  faMessage = faMessage;
  faTimes = faTimes;
  faUser = faUser;
  faExpand = faExpand;
  faPaperPlane = faPaperPlane;
  faPaperclip = faPaperclip;
  faMicrophoneLines = faMicrophoneLines;

  userLogged: boolean = true;

  miniChatOpen: boolean = false;

  chatExpanded: boolean = false;
  
  notification:boolean = false;

  isSideBarExpanded:boolean = false;

  rota:String = window.location.href;
  rotaChat:String = "http://localhost:4200/chat";
  rotaAtual:string = window.location.href;

  constructor(
    private personalization : PersonalizationService, 
    private contexts: ChildrenOutletContexts,
    private router:Router
  ){
    personalization.setPersonalization();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  openSideBar() {
    this.isSideBarExpanded = !this.isSideBarExpanded;
  }


  inputColor: string = '#FFFFFF';
  fontColor: string = '#000000';
  buttonColor: string = '#FFFFFF';
  fontSize!: number;

  updateColor(): void {
    console.log(this.inputColor)
    document.documentElement.style.setProperty('--custom-color', this.inputColor);
    document.documentElement.style.setProperty('--font-color', this.fontColor);
    document.documentElement.style.setProperty('--button-color', this.buttonColor);
    
    const fontSize = this.fontSize + "px";
    document.documentElement.style.setProperty('--font-size', fontSize);
  }

  expandChat():boolean{
    return this.chatExpanded = !this.chatExpanded;
  }

  minimizeChat():boolean{
    return this.chatExpanded = !this.chatExpanded;
  }

  openMiniChat(){
    this.miniChatOpen = !this.miniChatOpen;
  }

  switchNotifications():void{
    this.notification = !this.notification;
  }
}

