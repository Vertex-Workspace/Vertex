import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { defaultImage } from 'src/assets/data/defaultImg';

@Component({
  selector: 'app-create-team-project',
  templateUrl: './create-team-project.component.html',
  styleUrls: ['./create-team-project.component.scss']
})
export class CreateTeamProjectComponent implements OnInit {
  faImage = faImage;

  modalCopyLink: boolean = false;
  defaultImg: string = defaultImage;

  form !: FormGroup;

  @Output()
  close = new EventEmitter();

  @Output()
  createTeam = new EventEmitter<Team>();

  @Output()
  createProject = new EventEmitter<Project>();

  @Input()
  typeString!: String;

  logged !: User;

  selectedFile !: any;
  base64 !: any;
  

  constructor(
    private personalization: PersonalizationService, 
    private teamService: TeamService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.logged = this.userService.getLogged();

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
    });
  }

  ngOnInit(): void {

  }


  onSubmit(): void { 
    if (this.typeString === 'team') {
      const team = this.form.getRawValue() as Team;
      this.base64 
        ? team.image = this.base64
        : team.image = this.defaultImg;
        console.log(team);
        

      this.createTeam.emit(team);

    } else {
      const project = this.form.getRawValue() as Project;
      this.createProject.emit(project);
    }

    this.confirmCreateTeam();
  }

  url!: any;

  onFileSelected(e: any): void {   
    this.selectedFile = e.target.files[0];
    const fd: FormData = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);  

    let reader = new FileReader();

    

    if(e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base = reader.result as string;    
        this.base64 = base.split(",").pop();
        this.url = reader.result;
      };
    }
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
    this.closeScreen();
  }
}
