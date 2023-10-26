import { Component } from '@angular/core';
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

  clickOption(id: string): void{
    this.click = id;
    console.log(this.click)
  }

  itemsList = [
    { id: 'perfil', icon: faUser, option: 'Perfil'},
    { id: 'seguranca', icon: faLock, option: 'Segurança'},
    { id: 'aparencia', icon: faPaintBrush, option: 'Aparência do Sistema'},
    { id: 'equipes', icon: faUsers, option: 'Equipes'},
    { id: 'notificacoes', icon: faBell, option: 'Notificações'}
  ];

}
