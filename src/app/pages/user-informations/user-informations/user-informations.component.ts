import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/class/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-informations',
  templateUrl: './user-informations.component.html',
  styleUrls: ['./user-informations.component.scss']
})
export class UserInformationsComponent {
  faCircleUser = faCircleUser;
  faTrashCan = faTrashCan;

  dataPie: any;
  optionsPie: any;
  dataBar: any;
  optionsBar: any;
  imageUrl !: string;

  user!: User;
  userObservable!: Observable<User>
  constructor(
    private userService: UserService,
    private activatedRoute : ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id : number = Number(this.activatedRoute.snapshot.paramMap.get('id'));;
    
    this.userObservable = this.userService.getInformationsById(id, this.userService.getLogged().id!);
    this.userObservable.subscribe(
      (user : User) => {
        console.log(user);
        this.user = user;
        
        this.start();
      }
      );
      

  }


  start(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataPie = {
      labels: ['Não Iniciado', 'Em Andamento', 'Concluídas'],
      datasets: [
        {
          label: 'Andamentos das Tarefas',
          data: this.user.tasksPerformances,
          backgroundColor: ["#ffe2dd", "#fdecc8", "#dbeddb"],
          borderColor: ["#ffe2dd", "#fdecc8", "#dbeddb"],
          borderWidth: 1
        }
      ]
    };

    const documentStyle1 = getComputedStyle(document.documentElement);
    const textColor1 = documentStyle1.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle1.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle1.getPropertyValue('--surface-border');

    this.dataBar = {
      labels: ['Não Iniciado', 'Em Andamento', 'Concluídas'],
      datasets: [
        {
          label: 'Andamentos das Tarefas',
          data: this.user.tasksPerformances,
          backgroundColor: ["#ffe2dd", "#fdecc8", "#dbeddb"],
          borderColor: ["#ffe2dd", "#fdecc8", "#dbeddb"],
          borderWidth: 1
        }
      ]
    };
  }

  projects = [
    {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 61.00
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 30.50
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.50
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    },
  ]

}


