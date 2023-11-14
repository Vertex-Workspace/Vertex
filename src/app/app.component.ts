import { Component, Input, OnInit, Output } from '@angular/core';
import { ChildrenOutletContexts, RouterLink, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { PersonalizationService } from './services/personalization.service';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent{
  title = 'Vertex';
  faMessage = faMessage;

  userLogged: boolean = true;

  miniChatOpen: boolean = false;
  
  isSideBarExpanded:boolean = false;

  rota:String = window.location.href;
  rotaChat:String = "http://localhost:4200/chat";

  constructor(
    private personalization : PersonalizationService, 
    private contexts: ChildrenOutletContexts
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

  openMiniChat(){
    this.miniChatOpen = !this.miniChatOpen;
  }
}
