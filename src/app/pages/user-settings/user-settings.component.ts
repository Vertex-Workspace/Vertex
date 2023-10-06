import { Component } from '@angular/core';
import { faUser, faUsers, faPaintBrush, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons'

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
  faUserCircle = faUserCircle

  click: string = 'perfil';

  itemsList = [
    { id: 'perfil', icon: faUser, option: 'Perfil'},
    { id: 'aparencia', icon: faPaintBrush, option: 'Aparência do Sistema'},
    { id: 'equipes', icon: faUsers, option: 'Equipes'},
    { id: 'notificacoes', icon: faBell, option: 'Notificações'}
  ];

}
