import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Team } from 'src/app/models/team';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-create-team-project',
  templateUrl: './create-team-project.component.html',
  styleUrls: ['./create-team-project.component.scss']
})
export class CreateTeamProjectComponent implements OnInit {
  faImage = faImage;

  modalCopyLink: boolean = false;

  @Output()
  close = new EventEmitter();

  @Input()
  typeString!: String;

  primaryColor: string;
  secondColor: string;
  
  constructor(private personalization : PersonalizationService, private teamService: TeamService){
    this.primaryColor = personalization.getPrimaryColor();
    this.secondColor = personalization.getSecondColor();
  }
  ngOnInit(): void {
    let teamTest: Team = {
      name: "Teste",
      creationDate: new Date(),
      description: "Teste",
      users: [],
      creator: undefined,
      groups: [],
      projects: []
    };

    this.teamService.create(teamTest).subscribe((team) => {
      console.log(team);
    });
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
