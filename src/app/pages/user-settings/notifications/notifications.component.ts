import { Component } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';
import { faBell, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  faBell = faBell;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;

  toogleOn: boolean = true;

  tooglesList = [
    {text: "Atualizações" },
    {text: "Entrada de novos membros"},
    {text: "Comentários"},
    {text: "Mudança de permissões"},
  ];

  generalTooglesList = [
    {text: "Enviar notificações por e-mail" },
    {text: "Receber boletim de histórico diariamente"},
    {text: "Receber novidades do sistema"},
  ];

  // Alter the status of toogle
  toogleCharts(): void{
    // if(this.tooglesList){
      console.log(1)
    //   this.toogleOn = !this.toogleOn;
    // }
  } 
}