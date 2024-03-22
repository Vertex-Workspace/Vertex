import { Component } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';
import { faBell, faToggleOn, faToggleOff, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/class/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  faBell = faBell;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faPlusCircle = faPlusCircle;
  inputEmail: boolean = false;

  tooglesList = [
    {label: "reviewTask",text: "Receber envios e devolutivas de tarefas", icon: faToggleOff},
    {label: "newMembers",text: "Entrada de novos membros", icon: faToggleOff},
    {label: "permissionsChanged",text: "Mudança de permissões", icon: faToggleOff},
    {label: "",text: "Atribuições de responsabilidade de projetos e tarefas", icon: faToggleOff},
    {label: "",text: "Qualquer atualização em tarefa", icon: faToggleOff},
    {label: "",text: "Enviar notificações por e-mail", icon: faToggleOff},
  ];



  emailsList = [
    {email: "kaique@gmail.com"}
  ];

  constructor(private userService : UserService) {}

  ngOnInit(): void {
    const user : User = this.userService.getLogged();
    this.updateToggles(user);
  }

  // Alter the status of toogle
  toogleCharts(item: number): void{
    this.userService.notificationSettings(this.userService.getLogged().id!, (item+1)).subscribe(
      (user: User) => {
        this.userService.saveLoggedUser(user);
        this.updateToggles(user);
      },
      (error) => {
        console.log(error);
      }
    );
    
  }

  private updateToggles(user : User):void{
    let list : any[] = [
      user.taskReview,
      user.newMembers,
      user.permissionsChanged,
      user.responsibleInProjectOrTask,
      user.anyUpdateOnTask,
      user.sendToEmail
    ];
    
    for(let i = 0; i < list.length; i++){
      this.tooglesList[i].icon = list[i] ? faToggleOn : faToggleOff;
    } 
  }

  toogleGeneral(item: number): void{
    // if(this.generalTooglesList[item].icon == faToggleOn){
    //   this.generalTooglesList[item].icon = faToggleOff;
    // }
    // else if(this.generalTooglesList[item].icon == faToggleOff){
    //   this.generalTooglesList[item].icon = faToggleOn;
    // }
  }

  openInput() : void{
    this.inputEmail = !this.inputEmail;
  }
}