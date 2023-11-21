import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  notifications:boolean = true;

  @Output()
  openNotification = new EventEmitter();

  openNotifications():void{
    console.log("openNotifications");
    this.openNotification.emit();
  }
}
