import { Component } from '@angular/core';
import { faUser, faEnvelope, faLock,
    faEarthAmericas, faKey, faAngleDown, faToggleOff,
     faPencil, faToggleOn, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { PersonalizationService } from 'src/app/services/personalization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEarthAmericas = faEarthAmericas;
  faKey = faKey;
  faAngleDown = faAngleDown;
  faToggleOff = faToggleOff;
  faToggleOn = faToggleOn;
  faPencil = faPencil;
  faCircleUser = faCircleUser;

  primaryColor: string;
  secondColor: string;

  itemsList = [
    { id: 'email', icon: faEnvelope, placeholder: 'ana_cb@estudante.sesisenai.org.br', option: 'E-mail'},
    { id: 'name', icon: faUser, placeholder :'Ana Clara', option: 'Nome'},
    { id: 'location', icon: faEarthAmericas, placeholder :'São Paulo, Brazil', option: 'Localização'},
  ];

  constructor(private personalization : PersonalizationService){
    this.primaryColor = personalization.getPrimaryColor();
    this.secondColor = personalization.getSecondColor();
  }

  teste(){
    console.log("teste");
  }

  toogleOn: boolean = true;
  buttonEdit: boolean = true;
  buttonConfirm: boolean = false;
  contentEditable: boolean = false;
  click: string = 'initial';

  // Alter the status of toogle
  toogleCharts(): void{
    this.toogleOn = !this.toogleOn;
  }

  changeButton(): void{
    this.buttonEdit = !this.buttonEdit;
    this.buttonConfirm = !this.buttonConfirm;
  }

  clickOption(id: string): void{
    this.click = id;
    console.log(this.click)
  }
}