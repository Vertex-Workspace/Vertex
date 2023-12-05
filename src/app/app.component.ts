import { ChangeDetectorRef, Component } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterLink, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { PersonalizationService } from './services/personalization.service';
import { faMessage, faBell } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip, faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { UserStateService } from './services/user-state.service';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    slideInAnimation
  ],
})
export class AppComponent {
  [x: string]: any;

  title = 'Vertex';

  inputColor: string = '#FFFFFF';
  fontColor: string = '#000000';
  buttonColor: string = '#FFFFFF';
  fontSize!: number;

  faMessage = faMessage;
  faTimes = faTimes;
  faUser = faUser;
  faExpand = faExpand;
  faPaperPlane = faPaperPlane;
  faPaperclip = faPaperclip;
  faMicrophoneLines = faMicrophoneLines;

  userLogged: boolean = true;
  logged!: User;

  miniChatOpen: boolean = false;

  chatExpanded: boolean = false;

  notification: boolean = false;

  isSideBarExpanded: boolean = false;


  constructor(
    private personalization: PersonalizationService,
    private contexts: ChildrenOutletContexts,
    private router: Router,
    private alert: AlertService,
    private userService: UserService,
    private userState: UserStateService
  ) {
    personalization.setPersonalization();

    this.userState
      .getAuthenticationStatus()
      .subscribe((status: boolean) => {
        this.userLogged = status;
      });
  }

  ngOnInit(): void {
    this.logged = this.userService.getLogged();

    let personalization;

    this.personalization.findById(this.logged.id!).subscribe((pers:any) =>{
      personalization = pers;
      console.log(personalization);
    });

    

    //setar o tema do usuário com o document.documentElement.style.setProperty('--primary-color', personalization.primaryColor);

  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  openSideBar() {
    this.isSideBarExpanded = !this.isSideBarExpanded;
  }

  expandChat(event: any) {
    this.chatExpanded = event.action;
  }

  minimizeChat() {
    this.chatExpanded = !this.chatExpanded;
  }

  openMiniChat() {
    this.miniChatOpen = !this.miniChatOpen;
  }

  switchNotifications(): void {
    this.notification = !this.notification;
  }

}

