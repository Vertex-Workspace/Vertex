import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { TreeNode } from 'primeng/api';
import { Group } from 'src/app/models/class/groups';
import { Project } from 'src/app/models/class/project';
import { Team } from 'src/app/models/class/team';
import { User } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { GroupService } from 'src/app/services/group.service';
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
  team?: Team;

  users !: User[];

  groups !: Group[]

  @Input()
  typeString!: String;

  @Input()
  project ?: Project

  logged !: User;

  selectedFile !: any;
  base64 !: any;
  fd !: FormData;
  

  constructor(
    private personalization: PersonalizationService,
    private teamService: TeamService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private groupService: GroupService
  ) {
    this.logged = this.userService.getLogged();

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      listOfResponsibles: [null],
    });
  }

  ngOnInit(): void {
    this.getGroups();
    this.getUsers();
    this.projectExists()
  }

  projectNull: boolean = true;
  name !: string
  description ?: string 

  projectExists(){
    if(this.project != null){
      this.projectNull = false
      this.name = this.project.name
      this.description = this.project.description
      this.projectService.getProjectCollaborators(this.project.id).subscribe((users : User[]) => {
        for(const user of users){
          this.listOfResponsibles.push(user)
        }
      })
    }
  }


  onSubmit(): void {
    // if (!this.fd.has('file')) this.setDefaultImage();
    if (this.typeString === 'team') this.createTeam();
    else this.createProject();

    this.confirmCreateTeam();
  }

  setDefaultImage(): void {
    // this.fd.append('file', this.defaultImg);
  }


  createTeam(): void {
    const team = this.form.getRawValue() as Team;
      team.creator = this.logged;
      
      this.teamService
        .create(team)
        .subscribe((teamRes: Team) => {          
          this.alert.successAlert(`Equipe ${teamRes.name} criada com sucesso!`);
          
          if (this.fd) {
            this.teamService
            .updateImage(teamRes.id!, this.fd)
            .subscribe();
          }
      })
  }

  createProject(): void {
    let project = this.form.getRawValue() as Project;
    console.log(this.fd);
    
   
    let listOfResponsibles: User[] = [];
    project.listOfResponsibles?.forEach((type => {
      if (type instanceof Group) {
        let group: Group = type as Group;
        this.userService.getUsersByGroup(group.id).subscribe((users: User[]) => {
          for (const user of users) {
              listOfResponsibles.push(user);
          }
        });
      } else if (type instanceof User) {
        let user: User = type as User;
          listOfResponsibles.push(user);
      } 

      project.listOfResponsibles = listOfResponsibles;
    }));

    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));    
    project.creator = {
      user: {
        id: this.logged.id!
      },
      team: {
        id: teamId
      }
    };

    this.projectService
      .create(project, teamId)
      .subscribe((project: Project) => {
        this.alert.successAlert(`Projeto criado com sucesso!`);
        console.log(project.id);
        if (this.fd) {
          this.projectService
          .updateImage(project.id, this.fd)
          .subscribe();
        }
      });
  }

  url!: any;

  onFileSelected(e: any): void {   
    this.fd = new FormData()
    this.selectedFile = e.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    let reader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
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

  listOfResponsibles: any[] = []

  private getUsers(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUsersByTeam(teamId).subscribe((users: User[]) => {
      this.users = users
      for (const user of users) {
        user.icon = 'pi pi-user'
        this.listOfResponsibles.push(user);
      }
    });
  }

  private getGroups(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.groupService.getGroupsByTeam(teamId).subscribe((groups: Group[]) => {
      this.groups = groups;

      for (const group of groups) {
        this.userService.getUsersByGroup(group.id).subscribe((users: User[]) => {
          group.children = users
          group.icon = 'pi pi-users'
          this.listOfResponsibles.push(group)
        })
      }
    });
  }

  optionsReview = [
    {name: 'Revisão obrigatória'},
    {name: 'Revisão não obrigatória'},
    {name: 'Revisão opcional'}
  ]
}