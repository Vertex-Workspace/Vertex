import { Component } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-informations',
  templateUrl: './user-informations.component.html',
  styleUrls: ['./user-informations.component.scss']
})
export class UserInformationsComponent {
  faCircleUser = faCircleUser;
  faTrashCan = faTrashCan;

  projects = [
    {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021'
    },
  ]

}
