import { Component } from '@angular/core';
import { faUser, faUsers, faPaintBrush, faBell } from '@fortawesome/free-solid-svg-icons'

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
}
