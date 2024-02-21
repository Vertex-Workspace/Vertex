import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { ProjectService } from 'src/app/services/project.service';
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

  @Input()
  team ?: Team;


  @Input()
  typeString!: String;

  logged !: User;

  selectedFile !: any;
  base64 !: any;
  fd : FormData = new FormData();
  

  constructor(
    private personalization: PersonalizationService, 
    private teamService: TeamService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alert: AlertService
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
    if (!this.fd) this.getDefaultImg();
    if (this.typeString === 'team') this.createTeam();
    else this.createProject();

    this.confirmCreateTeam();
  }

  getDefaultImg(): void {
    const file = this.DataURIToBlob(this.base64)
    const formData = new FormData();
    this.fd.append('file', file, 'file') 
    console.log(this.fd);
    

  }

    DataURIToBlob(dataURI: string): any {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
      }


  createTeam(): void {
    const team = this.form.getRawValue() as Team;

      team.creator = this.logged;
      this.teamService
        .create(team)
        .subscribe((team: Team) => {
          this.alert.successAlert(`Equipe ${team.name} criada com sucesso!`);
          this.teamService
            .updateImage(team.id!, this.fd)
            .subscribe();
        },
        e => {
          this.alert.errorAlert(`Erro ao criar a equipe!`)
        });
  }

  createProject(): void {
    const project = this.form.getRawValue() as Project;

    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    project.creator = this.logged;

    this.projectService
      .create(project, teamId)
      .subscribe((project: Project) => {
        this.alert.successAlert(`Projeto ${project.name} criado com sucesso!`);
        this.projectService
          .updateImage(project.id!, this.fd)
          .subscribe();
      });
  }

  url!: any;

  onFileSelected(e: any): void {   
    this.selectedFile = e.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);      
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
