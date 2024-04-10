import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faMagnifyingGlass, faGear,faUser,faMessage } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss']
})
export class MobileSidebarComponent {

  faHouse = faHouse;
  faMagnifyingGlass = faMagnifyingGlass;
  faGear = faGear;
  faUser = faUser;
  faMessage = faMessage;

  constructor(
    private userService: UserService,
    private router:Router
  ) {}

  items: any = [
    { icon: "pi pi-search", command: () => { this.switchSearch(); } },
    { icon: "pi pi-comment", command: () => { this.openChat()} },
    { icon: "pi pi-home", command: () => { this.router.navigate(["home"]) } },
    { icon: "pi pi-user", command: () => { this.router.navigate(['perfil/' + this.userService.getLogged().id!]) } },
    { icon: "pi pi-cog", command: () => { this.router.navigate(['configuracoes']) } },
  ]

  search: boolean = false;
  switchSearch():void{
    this.search = !this.search;
  }

  @Output()
  isMiniChatOpen: EventEmitter<void> = new EventEmitter();
  openChat():void{
    return this.isMiniChatOpen.emit();
  }

}
