import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faMessage, faMagnifyingGlass, faClipboardList, 
  faUser, faGear, faSignOut, faBellSlash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { JoyrideService } from 'ngx-joyride';
import { UserService } from 'src/app/services/user.service';
import { tutorialText } from 'src/app/tutorialText';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  faMessage = faMessage;
  faMagnifyingGlass = faMagnifyingGlass;
  faClipboardList = faCheckCircle;
  faUser = faUser;
  faGear = faGear;
  faSignOut = faSignOut;
  string : string = "";
  tutorialText: any[] = tutorialText;

  constructor(
    private userService: UserService,
    private router:Router,
  ) {
    
  }

  items: any = [
    { label: "Pesquisar", icon: "pi pi-search", command: () => { this.switchSearch(); } },
    { label: "Conversas", icon: "pi pi-comment", command: () => { this.router.navigate(['chat']) } },
    { label: "Perfil", icon: "pi pi-user", command: () => { this.router.navigate(['perfil/' + this.userService.getLogged().id!]) } },
    { label: "Configurações", icon: "pi pi-cog", command: () => { this.router.navigate(['configuracoes']) } },
    { label: "Sair", icon: "pi pi-sign-out", command: () => { this.logout(); }},
  ]

  @Input()
  isSideBarExpanded: boolean = false;

  search: boolean = false;
  switchSearch():void{
    this.search = !this.search;
    this.isSideBarExpanded = false;
  }

  @Output()
  openChat = new EventEmitter();
  openChatExpanded(bool: boolean){
    this.openChat.emit({ action: bool });
    this.isSideBarExpanded = false;
  }


  logout(): void {
    this.isSideBarExpanded = false;
    this.userService.logout();
  }
}
