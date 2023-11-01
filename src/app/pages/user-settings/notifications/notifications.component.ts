import { Component } from '@angular/core';
import { faBell, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  faBell = faBell;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;

  toogleOn: boolean = true;

  // Alter the status of toogle
  toogleCharts(): void{
    this.toogleOn = !this.toogleOn;
  }
  
}