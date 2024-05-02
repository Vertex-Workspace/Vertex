import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/class/task';
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

  user!: User;
  userObservable!: Observable<User>
  loggedUser!: User;
  showCommonTasks: boolean = true;
  

  constructor(
    private userService: UserService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private translate : TranslateService
  ) {
    this.loggedUser = this.userService.getLogged();
  }

  ngOnInit() {
    const id : number = Number(this.activatedRoute.snapshot.paramMap.get('id'));;
    
    this.userObservable = this.userService.getInformationsById(id, this.userService.getLogged().id!);
    this.userObservable.subscribe(
      (user : User) => {
        
        if(user.id == this.loggedUser.id) {
          this.showCommonTasks = false;
          
        }
        console.log(user);
        this.user = user;
        

        this.start();
      }
      );
      

  }


  start(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
  
    let finalSum = 0;
    this.user.tasksPerformances!.forEach((number) => finalSum += number);
    
    //Set Label following the percentage of each task
    let labels : string[] = [];
    this.user.tasksPerformances!.forEach(
      (number) => labels.push(((number * 100) / finalSum).toFixed(2) + "%"));
       
    this.dataPie = {
      labels:  labels
      ,
      datasets: [
        {
          label: this.translate.instant('pages.user-informations.tasksPerformance'),
          data: this.user.tasksPerformances,
          backgroundColor: ["#ffe2dd", "#fdecc8", "#dbeddb"],
          borderColor: ["#d93b3b", "#d9bf3b", "#70d93b"],
          borderWidth: 1
        }
      ]
    };

    const documentStyle1 = getComputedStyle(document.documentElement);
    const textColor1 = documentStyle1.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle1.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle1.getPropertyValue('--surface-border');

    this.dataBar = {
      labels: [this.translate.instant("pages.team-informations.NaoIniciadas"), this.translate.instant("pages.team-informations.EmAndamento"), this.translate.instant("pages.team-informations.Concluidas")],
      datasets: [
        {
          label: this.translate.instant('pages.user-informations.tasksPerformance'),
          data: this.user.tasksPerformances,
          backgroundColor: ["#ffe2dd", "#fdecc8", "#dbeddb"],
          borderColor: ["#d93b3b", "#d9bf3b", "#70d93b"],
          borderWidth: 1
        }
      ]
    };
  }

  goToTask(task : any){
    this.router.navigate(['projeto/' + task.projectId + '/tarefas'], {queryParams: {taskID: task.id}})
  }

}


