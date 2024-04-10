import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowUpRightFromSquare, faCircleUser, faClose, faEnvelope, faGear, faGraduationCap, faGripLinesVertical, faHandHoldingDroplet, faSquare, faSquareFull, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Notification } from 'src/app/models/class/notification';
import { NotificationWebSocketService } from 'src/app/services/notification-websocket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  //ICONS
  faClose = faClose;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;
  faEnvelope = faEnvelope;
  faTrash = faTrash;
  faGear = faGear;
  faSquare = faSquare;
  faCircleUser = faCircleUser;

  @Output()
  close = new EventEmitter();


  @Input()
  notifications: Notification[] = [];


  constructor(
    private userService: UserService,
    private notificationWebSocket: NotificationWebSocketService,
    private router: Router) {

  }

  ngOnInit() {

  }


  searchBarOpen: boolean = false;
  query: string = "";
  toggleSearchBar(): void {
    this.searchBarOpen = !this.searchBarOpen;
  }

  checkbox: boolean = false;
  changeSelectedState(notification: any): void {
    notification.isSelected = !notification.isSelected;
  }
  changeSelectedStateAll(): void {
    this.checkbox = !this.checkbox;
    this.notifications.forEach((notification) => {
      notification.isSelected = this.checkbox;
    });
  }


  notificationDetails(notification: Notification): void {

    let url = notification.linkRedirect;
    if (url.includes('taskID')) {
      url = url.substring(url.indexOf('=') + 1, url.length);

      let start = notification.linkRedirect.substring(0, notification.linkRedirect.indexOf('?'));

      this.router.navigate([start], { queryParams: { taskID: url } });
    } else {
      console.log(url);

      this.router.navigate([url]);
    }
  }

  handleSectionClick(event: MouseEvent) {
    event.stopPropagation();
  }

  hasChecked(): boolean {
    return this.notifications.some((notification) => notification.isSelected);
  }

  closeNotification(): void {
    this.close.emit();
  }

  getDate(date: Date): any {
    return new Date(date).toLocaleString();
  }

  readNotifications(): void {
    //Select the notifications that are selected
    let notifications = this.notifications.filter((notification) => notification.isSelected);

    //If there is any unread notification
    if (notifications.some((notification) => !notification.isRead)) {
      notifications = notifications.filter(notification => !notification.isRead);
    }

    this.userService.readNotifications(this.userService.getLogged().id!, notifications).subscribe(
      (notifications) => {
        this.notifications = notifications;
      });

    if (this.checkbox) {
      this.checkbox = false;
    }
  }
  deleteNotifications(): void {
    const notifications = this.notifications.filter((notification) => notification.isSelected);

    this.userService.deleteNotifications(this.userService.getLogged().id!, notifications).subscribe(
      (response) => {
        this.notifications = this.notifications.filter((notification) => !notification.isSelected
        );
      });
    if (this.checkbox) {
      this.checkbox = false;
    }
  }

}
