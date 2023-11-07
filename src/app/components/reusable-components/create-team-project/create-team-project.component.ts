import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { PersonalizationService } from 'src/app/services/personalization.service';

@Component({
  selector: 'app-create-team-project',
  templateUrl: './create-team-project.component.html',
  styleUrls: ['./create-team-project.component.scss']
})
export class CreateTeamProjectComponent {
  faCircleUser = faCircleUser;

  modalCopyLink: boolean = false;

  @Output()
  close = new EventEmitter();

  @Input()
  typeString!: String;

  primaryColor: string;
  secondColor: string;
  constructor(private personalization : PersonalizationService){
    this.primaryColor = personalization.getPrimaryColor();
    this.secondColor = personalization.getSecondColor();
  }

  closeScreen():void{
    this.close.emit();
  }
  confirmCreateTeam():void{
    if(this.typeString === "project"){
      this.closeScreen();
    }
    //validations
  
    this.modalCopyLink = true;
  }

  copyLink():void{
    //copiar para a area te transferência
    console.log("Dale");
    this.closeScreen();
  }


}
