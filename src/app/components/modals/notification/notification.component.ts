import { Component } from '@angular/core';
import { faBars, faCircleUser, faClose, faGear, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  faClose = faClose;
  
  faBars = faBars;


  notifications:any[] =[
    {
      new: true,
      icon: faCircleUser,
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
      author: "Kaique",
      action: "atribuiu você ao",
      team: "AKMO",
      project: "AKMO",
      date: new Date(2023, 10, 15),
      moreInformations: false
    },
  ]

  notificationDetails(notification:any):void{
    notification.moreInformations = !notification.moreInformations;
  }
}
