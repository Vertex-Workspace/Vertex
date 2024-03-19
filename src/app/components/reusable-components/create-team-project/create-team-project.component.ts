import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { TreeNode } from 'primeng/api';
import { Group } from 'src/app/models/class/groups';
import { Project, ProjectEdit } from 'src/app/models/class/project';
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
  project?: Project

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
    this.projectExists()
    // this.markCollaboratorsAsSelected();
  }

  projectNull: boolean = true;
  name !: string
  description?: string

  projectExists() {
    if (this.project != null) {
      this.projectNull = false;
      this.name = this.project.name;
      this.description = this.project.description;
      this.getGroups(this.project.idTeam)
      this.getUsers(this.project.idTeam);
    } else {
      const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
      this.getGroups(teamId);
      this.getUsers(teamId);
    }
  }



  onSubmit(): void {
    // if (!this.fd.has('file')) this.setDefaultImage();
    if (this.typeString === 'team') {
      this.createTeam()
    } else if (this.typeString === 'project') {
      this.createProject();
    } else if (this.typeString === 'projectInfo') {
      this.updateProject();
    }

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
        group.selected = true;
        this.userService.getUsersByGroup(group.id).subscribe((users: User[]) => {
          for (const user of users) {
            listOfResponsibles.push(user);
          }
        });
      } else if (type instanceof User) {
        let user: User = type as User;
        user.selectedProject = true;
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
        if (this.fd) {
          this.projectService
            .updateImage(project.id, this.fd)
            .subscribe();
        }
      });
      this.projectService.getProjectByCollaborators(teamId, this.logged).subscribe((projects: Project []) => {
        this.eventEmitter.emit(projects)
      })
  }

  @Output()
  eventEmitter = new EventEmitter()

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

  private getUsers(teamId: number): void {

    this.userService.getUsersByTeam(teamId).subscribe((users: User[]) => {
      this.users = users
      for (const user of users) {
        user.icon = 'pi pi-user'
        this.listOfResponsibles.push(user);
      }
      if (this.project != null) {
        this.projectService.getProjectCollaborators(this.project.id).subscribe((users: User[]) => {
          this.selectedUsers = users
          console.log(this.selectedUsers);
          
          this.markCollaboratorsAsSelected(this.selectedUsers)
        })
      }
    });
  }

  private getGroups(teamId: number): void {

    this.groupService.getGroupsByTeam(teamId).subscribe((groups: Group[]) => {
      this.groups = groups;

      for (const group of groups) {
        this.userService.getUsersByGroup(group.id).subscribe((users: User[]) => {
          group.children = users
          group.icon = 'pi pi-users'
          this.listOfResponsibles.push(group)
          if (this.project != null) {
            // this.markCollaboratorsAsSelected()
          }
        })
      }
    });
  }

  optionsReview = [
    { name: 'Revisão obrigatória' },
    { name: 'Revisão não obrigatória' },
    { name: 'Revisão opcional' }
  ]

  selectedUsers: any[] = [];

  markCollaboratorsAsSelected(users: any[]): void {
    this.selectedUsers = [];

    users.forEach(item => {
      if (item instanceof User) {
        let collaborator: User = item as User;
        this.selectedUsers.push({ label: collaborator.firstName, data: collaborator });
      }
    });

  }

  updateProject(): void {
    let project = this.form.getRawValue() as Project;

    const projectEdit: ProjectEdit = {
      id: this.project?.id,
      name: project.name,
      description: project.description,
      listOfResponsibles: project.listOfResponsibles
    }
    
    this.projectService.patchValue(projectEdit).subscribe((project: Project) => {
      this.project = project
      this.alert.successAlert("Projeto modificado com sucesso")
    })
  }
}