import { Component } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterLink, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { PersonalizationService } from './services/personalization.service';
import { faMessage, faBell } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip, faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { Project } from './models/project';
import { ProjectService } from './services/project.service';
import { MessageService } from 'primeng/api';
import { AlertService } from './services/alert.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    slideInAnimation
  ],
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

  userLogged: boolean = false;

  miniChatOpen: boolean = false;

  chatExpanded: boolean = false;
  
  notification:boolean = false;

  isSideBarExpanded:boolean = false;


  constructor(
    private personalization : PersonalizationService, 
    private contexts: ChildrenOutletContexts,
    private router:Router,
    private userService: UserService,
    private projectService: ProjectService,
    private alert: AlertService
  ){
    personalization.setPersonalization();
  }

  user : User = {
    firstName: "asdasd",
    lastName: "avcbcvbcv",
    email: "abc@gmail.com",
    password: "123"
  };

  project : Project = {
    name: 'project post',
    description: '',
    image: '',
    taskList: [],
  }

  ngOnInit(): void {
    // this.userService.getAll()
    //   .subscribe(users => {
    //     console.log(users);
    // })
    
    // this.userService.getOneById(3)
    //   .subscribe(user => {
    //     console.log(user);
    // })

  //   this.userService.create(this.user)
  //   .subscribe(user => {
  //     console.log(user);
  // })

  //   this.userService.getAll()
  //     .subscribe(users => {
  //       console.log(users);
  //   })

    // this.userService.delete(12)
    //   .subscribe(users => {
    //     console.log(users);
    // })

  //   this.projectService.getAll()
  //   .subscribe((projects: Project[]) => {
  //     console.log(projects);
  //   });

  // this.projectService.getOneById(1)
  //   .subscribe((project: Project) => {
  //     console.log(project);
  //   });

  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  openSideBar() {
    this.isSideBarExpanded = !this.isSideBarExpanded;
  }

  
  show() {
    this.alert.successAlert("parabéns você é um lixo de ser humano!");
  }


  inputColor: string = '#FFFFFF';
  fontColor: string = '#000000';
  buttonColor: string = '#FFFFFF';
  fontSize!: number;

  updateColor(): void {
    document.documentElement.style.setProperty('--custom-color', this.inputColor);
    document.documentElement.style.setProperty('--font-color', this.fontColor);
    document.documentElement.style.setProperty('--button-color', this.buttonColor);
    
    const fontSize = this.fontSize + "px";
    document.documentElement.style.setProperty('--font-size', fontSize);
  }

  expandChat(event:any){
    this.chatExpanded = event.action;
  }

  minimizeChat(){
    this.chatExpanded = !this.chatExpanded;
  }

  openMiniChat(){
    this.miniChatOpen = !this.miniChatOpen;
  }

  switchNotifications():void{
    this.notification = !this.notification;
  }
}

