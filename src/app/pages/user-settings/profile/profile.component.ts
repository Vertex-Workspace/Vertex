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

  // Alter the status of toogle
  toogleCharts(): void{
    this.toogleOn = !this.toogleOn;
  }

}