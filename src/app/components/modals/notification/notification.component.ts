import { Component } from '@angular/core';
import { faArrowUpRightFromSquare, faCircleUser, faClose, faEnvelope, faGear, faGraduationCap, faGripLinesVertical, faHandHoldingDroplet, faSquare, faSquareFull, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  faClose = faClose;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;
  faEnvelope = faEnvelope;
  faTrash = faTrash;
  faGear = faGear;
  faSquare = faSquare;

  notifications:any[] =[
    {
      new: true,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: true,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: true,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: false,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: false,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: false,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: false,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: false,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: false,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: false,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: false,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: false,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: false,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
    {
      new: false,
      icon: faCircleUser,
      isSelected: false,
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
  ]

  searchBarOpen: boolean = false;
  query: string = "";
  toggleSearchBar(): void {
    this.searchBarOpen = !this.searchBarOpen;
  } 
  

  checkbox:boolean = false;
  changeSelectedState(notification: any):void{
    notification.isSelected = !notification.isSelected;
  }

  changeSelectedStateAll():void{
    this.checkbox = !this.checkbox;
    this.notifications.forEach((notification) => {
      notification.isSelected = this.checkbox;
    });
  }
  notificationDetails(notification:any):void{
    //Logic
  }

  hasChecked():boolean{
    return this.notifications.some( (notification) => notification.isSelected);
  }
}
