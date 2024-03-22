import { Component } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';
import { faBell, faToggleOn, faToggleOff, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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
    {text: "Receber devolutivas de tarefas", icon: faToggleOff},
    {text: "Entrada de novos membros", icon: faToggleOff},
    {text: "Comentários e anexos", icon: faToggleOff},
    {text: "Mudança de permissões", icon: faToggleOff},
    {text: "Enviar notificações por e-mail", icon: faToggleOff},
    {text: "Atribuições de responsabilidade de projetos e tarefas", icon: faToggleOff}
  ];



  emailsList = [
    {email: "kaique@gmail.com"}
  ];

  // Alter the status of toogle
  toogleCharts(item: number): void{
      if(this.tooglesList[item].icon == faToggleOn){
        this.tooglesList[item].icon = faToggleOff;
      }
      else{
        this.tooglesList[item].icon = faToggleOn;
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