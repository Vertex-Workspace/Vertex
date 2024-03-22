import { Component, EventEmitter, Output } from '@angular/core';
import { faArrowUpRightFromSquare, faCircleUser, faClose, faEnvelope, faGear, faGraduationCap, faGripLinesVertical, faHandHoldingDroplet, faSquare, faSquareFull, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Notification } from 'src/app/models/class/notification';
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

  //TEMPORARY LIST TEMPLATE
  notifications: Notification[] = []

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getNotifications(this.userService.getLogged().id!).subscribe(
      (notifications: Notification[]) => {
        this.notifications = notifications;
        console.log(notifications);

      });
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


  notificationDetails(notification: any): void {
    //Logic
  }

  hasChecked(): boolean {
    return this.notifications.some((notification) => notification.isSelected);
  }

  closeNotification(): void {
    console.log("close");
    this.close.emit();
  }

  getDate(date: Date): any {
    return new Date(date).toLocaleString();
  }

  readNotifications(): void {
    const notifications = this.notifications.filter((notification) => notification.isSelected);

    this.userService.readNotifications(this.userService.getLogged().id!, notifications).subscribe(
      (response) => {
        this.notifications.forEach((notification) => {
          if (notification.isSelected) {
            notification.isRead = true;
            notification.isSelected = false;
          }
        }
        );
      },
      (error) => {
        console.log(error);
      });
  }
  deleteNotifications(): void {
    const notifications = this.notifications.filter((notification) => notification.isSelected);

    this.userService.deleteNotifications(this.userService.getLogged().id!, notifications).subscribe(
      (response) => {
        this.notifications = this.notifications.filter((notification) => !notification.isSelected
        );
      },
      (error) => {
        console.log(error);
      });
  }
}
