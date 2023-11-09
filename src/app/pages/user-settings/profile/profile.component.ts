import { Component } from '@angular/core';
import { faUser, faEnvelope,
    faEarthAmericas, faKey, faAngleDown, faToggleOff,
     faPencil, faToggleOn, faCircleUser,
    faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { NgModel } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  faUser = faUser;
  faEnvelope = faEnvelope;
  faEarthAmericas = faEarthAmericas;
  faKey = faKey;
  faAngleDown = faAngleDown;
  faToggleOff = faToggleOff;
  faToggleOn = faToggleOn;
  faPencil = faPencil;
  faCircleUser = faCircleUser;
  faPenToSquare = faPenToSquare;

  primaryColor: string;
  secondColor: string;

  itemsList = [
    { id: 'email', icon: faEnvelope, placeholder: 'ana_cb@estudante.sesisenai.org.br', option: 'E-mail'},
    { id: 'name', icon: faUser, placeholder :'Ana Clara', option: 'Nome'},
    { id: 'location', icon: faEarthAmericas, placeholder :'São Paulo, Brazil', option: 'Localização'},
    { id: 'description', icon: faEarthAmericas, option: 'Descrição'}
  ];

  tooglesList = [
    {text: "Mostrar gráficos de desempenho para visitantes", icon: faToggleOff},
    {text: "Deixar meu perfil visível a visitantes", icon: faToggleOff}
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
  toogleCharts(item :number): void{
    if(this.tooglesList[item].icon == faToggleOff){
      this.tooglesList[item].icon = faToggleOn;
    }else {
      this.tooglesList[item].icon = faToggleOff;
    }
  }

  changeButton(): void{
    this.buttonEdit = !this.buttonEdit;
    this.buttonConfirm = !this.buttonConfirm;
  
  }

  clickOption(id: string): void{
    this.click = id;
    this.contentEditable = !this.contentEditable
    console.log(this.click)
  }

    onChange(): void {
    console.log(this.contentEditable)
    if(this.contentEditable == false){
    this.contentEditable = !this.contentEditable;
    }
  }
}