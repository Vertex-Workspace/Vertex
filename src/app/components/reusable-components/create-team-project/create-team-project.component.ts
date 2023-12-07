import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
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

  form !: FormGroup;

  @Output()
  close = new EventEmitter();

  @Output()
  createTeam = new EventEmitter<Team>();

  @Output()
  createProject = new EventEmitter<Project>();

  @Input()
  typeString!: String;
  

  primaryColor: string;
  secondColor: string;

  constructor(
    private personalization: PersonalizationService, 
    private teamService: TeamService,
    private formBuilder: FormBuilder
  ) {
    this.primaryColor = personalization.getPrimaryColor();
    this.secondColor = personalization.getSecondColor();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      image: [null],
    });
  }

  onSubmit(): void { 
    if (this.typeString === 'team') {
      const team = this.form.getRawValue() as Team;
      this.createTeam.emit(team);

    } else {
      const project = this.form.getRawValue() as Project;
      this.createProject.emit(project);
    }

    this.confirmCreateTeam();
  }

  closeScreen(): void {
    this.close.emit();
  }

  confirmCreateTeam(): void {
    //validations

    this.modalCopyLink = true;
  }

  copyLink(): void {
    //copiar para a area de transferência
    console.log("Dale");
    this.closeScreen();
  }
}
