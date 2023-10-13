import { Component } from '@angular/core';
import { faCircleUser, faEnvelope, faLock,
    faEarthAmericas, faKey, faAngleDown, faToggleOff,
     faPencil, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { PersonalizationService } from 'src/app/services/personalization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  faCircleUser = faCircleUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEarthAmericas = faEarthAmericas;
  faKey = faKey;
  faAngleDown = faAngleDown;
  faToggleOff = faToggleOff;
  faToggleOn = faToggleOn;
  faPencil = faPencil;

  primaryColor: string;
  secondColor: string;

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
  click: string = 'edit';
  clickName: string = 'changeName';

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
    this.buttonEdit = !this.buttonEdit;
    this.buttonConfirm = !this.buttonConfirm;
    console.log(this.click)
  }

  clickEdit(id: string): void{
    this.clickName = id;
    this.contentEditable = !this.contentEditable;
    console.log(this.contentEditable);
    console.log(1)
  }

  isEditable(): boolean{
    return !this.buttonEdit;
  }

  showConfirm(): boolean {
    return this.buttonConfirm;
  }

  editContent(): boolean{
    console.log(this.contentEditable);
    console.log(1)
    return this.contentEditable;

  }

}