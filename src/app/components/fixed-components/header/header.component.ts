import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  notifications:boolean = false;

  openNotifications():void{
    this.notifications = !this.notifications;
  }
}
