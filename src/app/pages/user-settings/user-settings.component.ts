import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faUsers, faPaintBrush, faBell, faUserCircle, faLock } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
  faUser = faUser;
  faUsers = faUsers;
  faPaintBrush = faPaintBrush;
  faBell = faBell;
  faUserCircle = faUserCircle;
  faLock = faLock;

  click: string = 'perfil';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.handleLocation();
  }

  clickOption(id: string): void{
    this.click = id;
  }

  handleLocation(): void {
    this.click = String(this.router.url.split("/").pop());
  }

  itemsList = [
    { id: 'perfil', icon: faUser, option: 'Meu Perfil'},
    { id: 'seguranca', icon: faLock, option: 'Segurança'},
    { id: 'aparencia', icon: faPaintBrush, option: 'Aparência'},
    { id: 'equipes', icon: faUsers, option: 'Equipes'},
    { id: 'notificacoes', icon: faBell, option: 'Notificações'}
  ];

}
