import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'; 
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faMinimize } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  faSearch = faSearch;
  faCircleUser = faCircleUser;
  faStar = faStar;
  faMinimize = faMinimize;
}
