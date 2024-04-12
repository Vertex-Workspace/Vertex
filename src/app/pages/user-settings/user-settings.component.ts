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

  ngOnInit(): void {
    const item = localStorage.getItem('settings-option');
    
    if (item) this.click = localStorage.getItem('settings-option')!
  }

  clickOption(id: string): void{
    this.click = id;
    localStorage.setItem('settings-option', id);
  }

  itemsList = [
    { id: 'perfil', icon: faUser, option: 'Meu Perfil'},
    { id: 'seguranca', icon: faLock, option: 'Segurança'},
    { id: 'aparencia', icon: faPaintBrush, option: 'Aparência'},
    { id: 'equipes', icon: faUsers, option: 'Equipes'},
    { id: 'notificacoes', icon: faBell, option: 'Notificações'}
  ];

}
