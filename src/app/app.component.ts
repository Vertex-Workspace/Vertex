
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, NavigationEnd, NavigationError, NavigationStart, Route, Router, RouterLink, RouterOutlet } from '@angular/router';

import { slideInAnimation } from './animations';
import { PersonalizationService } from './services/personalization.service';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { faPaperclip, faMicrophoneLines, faVolumeUp, faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';

import { UserStateService } from './services/user-state.service';
import { UserService } from './services/user.service';
import { User } from './models/class/user';
import { TeamService } from './services/team.service';
import { URL } from './services/path/api_url';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { TextSpeechService } from './services/text-speech.service';
import { Observable, of } from 'rxjs';

import { NotificationWebSocketService } from './services/notification-websocket.service';
import { Notification } from './models/class/notification';
import { tutorialText } from './tutorialText';


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
  tutorialText = tutorialText;

  inputColor: string = '#FFFFFF';
  fontColor: string = '#000000';
  buttonColor: string = '#FFFFFF';

  faVolumeUp = faVolumeUp;
  faVolumeOff = faVolumeOff;
  faMessage = faMessage;
  faTimes = faTimes;
  faUser = faUser;
  faExpand = faExpand;
  faPaperPlane = faPaperPlane;
  faPaperclip = faPaperclip;
  faMicrophoneLines = faMicrophoneLines;

  userLogged: boolean = false;
  logged!: User;

  miniChatOpen: boolean = false;

  chatExpanded: boolean = false;

  notification: boolean = false;

  isSideBarExpanded: boolean = false;

  url: string = '';

  constructor(
    private contexts: ChildrenOutletContexts,
    public router: Router,
    private userService: UserService,
    private userState: UserStateService,
    private alertService: AlertService,
    public textSpeechService: TextSpeechService,
    private notificationWebSocket: NotificationWebSocketService
  ) {
    this.userState.getAuthenticationStatus().subscribe((userLogged) => {
      this.userLogged = userLogged;
      if(userLogged && this.renderPersonalization == false){
        this.settingsRequest();
      }
    }
    );
  }



  private userBasicData() {
    this.userState.getAuthenticatedUser().then((user) => {
      if(user){
        this.userLogged = true;
        this.logged = this.userService.getLogged()!;
        this.settingsRequest();
        } else {
          this.router.navigate(['/login']);
        }
  });
  }
  renderPersonalization: boolean = false;

  private settingsRequest(){
    if (this.logged.personalization!.theme == 0) {
      document.documentElement.style.setProperty('--primaryColor', this.logged.personalization?.primaryColorLight!);
      document.documentElement.style.setProperty('--secondColor', this.logged.personalization?.secondColorLight!);
      
      document.documentElement.style.setProperty('--emphasis', "#D9D9D9");
      document.documentElement.style.setProperty('--card', "#FFFFFF");
      
      document.documentElement.style.setProperty('--text', "#000000");
    } else if (this.logged.personalization!.theme == 1) {
      document.documentElement.style.setProperty('--primaryColor', this.logged.personalization?.primaryColorDark!);
      document.documentElement.style.setProperty('--secondColor', this.logged.personalization?.secondColorDark!);
      document.documentElement.style.setProperty('--emphasis', "#161616");
      
      document.documentElement.style.setProperty('--card', "#161616");
      
      document.documentElement.style.setProperty('--text', "#BABABA");
    }
    
    document.documentElement.style.setProperty('--smallText', (this.logged.personalization?.fontSize! - 2) + 'px');
    document.documentElement.style.setProperty('--regularText', (this.logged.personalization?.fontSize!) + 'px');
    document.documentElement.style.setProperty('--mediumText', (this.logged.personalization?.fontSize! + 2) + 'px');
    document.documentElement.style.setProperty('--largeText', (this.logged.personalization?.fontSize! + 4) + 'px');
    document.documentElement.style.setProperty('--fontFamily', this.logged.personalization?.fontFamily!);
    
    this.renderPersonalization = true;
    //Normal Notifications request
    this.getNotificationBadge();
    
    //Web Socket
    this.notificationWebSocket.listenToServer().subscribe(
      (change) => {
        this.getNotificationBadge();
        
      }
      );
  }

  // Sets the theme by default and make the persistence of the theme in all components
  ngOnInit(): void {
    this.userBasicData();
  }

  notificationBadge: number = 0;
  notifications: Notification[] = [];
  private getNotificationBadge(): void {
    this.userService.getNotifications(this.userService.getLogged().id!).subscribe(
      (notifications) => {
        let notificationsUnread = notifications.filter((notification) => !notification.isRead);
        this.notificationBadge = notificationsUnread.length;
        this.notifications = notifications;
      }
    );
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



  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    const selectedText = window.getSelection()!.toString().trim();
    if (selectedText) {
      if (this.textSpeechService.canSpeak) {
        this.textSpeechService.speak(selectedText);
      }
    }
  }

  public startSpeech(): void {

    this.alertService.notificationAlert('Selecione um texto para ouvi-lo!');
    this.textSpeechService.canSpeak = true;

  }

  public stopSpeech(): void {
    this.alertService.errorAlert('Parando a tradução de texto para voz!')
    this.textSpeechService.stop();
    this.textSpeechService.canSpeak = false;
  }


}

