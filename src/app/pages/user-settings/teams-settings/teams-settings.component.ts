import { Component } from '@angular/core';
import { faUsers, faSearch, faCircleUser, faDoorOpen,
        faPaperclip } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teams-settings',
  templateUrl: './teams-settings.component.html',
  styleUrls: ['./teams-settings.component.scss']
})
export class TeamsSettingsComponent {

  faUsers = faUsers;
  faSearch = faSearch;
  faCircleUser = faCircleUser;
  faDoorOpen = faDoorOpen;
  faPaperclip = faPaperclip;

}