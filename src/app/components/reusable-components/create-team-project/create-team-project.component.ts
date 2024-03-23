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
  project!: Project

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
    private groupService: GroupService,
  ) {
    this.logged = this.userService.getLogged();

    // this.nodeService.getFiles().then((files) => (this.nodes = files));
    if (this.project != null) {
      this.projectService.getProjectCollaborators(5).subscribe((users: User[]) => {
        this.forms(users)
      })
    } else {
      this.forms(null)
    }
  }

  forms(users: any) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      listOfResponsibles: [users],
      groups: [null]
    });
  }

  listOfResponsibles: TreeNode[] = []
  selectedUsers: TreeNode[] = [];

  ngOnInit(): void {
    this.projectExists()

    this.userService.getUsersByTeam(this.project.idTeam).subscribe((users: User[]) => {
      this.listOfResponsibles = users

      for (const user of users) {
        this.projectService.getProjectCollaborators(this.project.id).subscribe((users1: User[]) => {
          for (const user1 of users1) {
            if (user.id === user1.id) {
              this.selectedUsers.push(user)
            }
          }
        })
        user.icon = 'pi pi-user'
      }
    })

    this.groupService.getGroupsByTeam(this.project.idTeam).subscribe((groups: Group[]) => {
      for (const group of groups) {
        this.listOfResponsibles.push(group)
        this.projectService.getGroupsFromProject(this.project.id).subscribe((groups1: Group[]) => {
          for (const group1 of groups1) {
            if (group.id === group1.id) {
              this.selectedUsers.push(group)
            }
          }
        })
        this.userService.getUsersByGroup(group.id).subscribe((users: User[]) => {
          group.children = users
          group.icon = 'pi pi-users'
        });
      }
    })
  }

  projectNull: boolean = true;
  name !: string
  description?: string

  projectExists() {
    if (this.project != null) {
      this.projectNull = false;
      this.name = this.project.name;
      this.description = this.project.description;
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

  @Output()
  sendTeam = new EventEmitter<Team>()

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
        this.sendTeam.emit(teamRes)
      })
  }


  createProject(): void {
    if(!this.closeModal){
    let project = this.form.getRawValue() as Project;

    let users: User[] = [];
    let groups: Group[] = []

    project.listOfResponsibles?.forEach((type => {
      if (type instanceof Group) {
        let group: Group = type as Group;
        group.selected = true;
        groups.push(group)
      } else
        if (type instanceof User) {
          let user: User = type as User;
          user.selectedProject = true;
          users.push(user);
        }

      project.users = users;
      project.groups = groups
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
      .subscribe((projectResponse: Project) => {
        console.log(project);

        this.alert.successAlert(`Projeto criado com sucesso!`);
        if (this.fd) {
          this.projectService
            .updateImage(projectResponse.id, this.fd)
            .subscribe();
        }
        this.emitCreation(projectResponse)
      });
    }
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

  closeModal ?: boolean
  closeScreen(): void {
    this.closeModal = true
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

  private getUsers(teamId: number): void {

    this.userService.getUsersByTeam(teamId).subscribe((users: User[]) => {
      this.users = users
      for (const user of users) {
        user.icon = 'pi pi-user'
        this.listOfResponsibles.push(user);
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
        })
      }
    });
  }

  optionsReview = [
    { name: 'Revisão obrigatória' },
    { name: 'Revisão não obrigatória' },
    { name: 'Revisão opcional' }
  ]

  updateProject(): void {
    let project = this.form.getRawValue() as Project;
    let list: User[] = []
    let groups: Group[] = []

    const projectEdit: ProjectEdit = {
      id: this.project?.id,
      name: project.name,
      description: project.description,
      groupsAndUsers: project.listOfResponsibles
    }

    projectEdit.groupsAndUsers!.forEach((type => {
      if (type instanceof Group) {
        let group: Group = type as Group;
        group.selected = true;
        group.users = undefined
        group.children = undefined
        groups.push(group);
        console.log(group);
        
      } else if (type instanceof User) {
        let user: User = type as User;
        user.selected = true
        list.push(user)
        console.log(user);
        
      }
    }));

    projectEdit.groups = groups
    projectEdit.listOfResponsibles = list

    if (projectEdit.name == null) {
      projectEdit.name = this.project?.name
    }
    if (projectEdit.description == null) {
      projectEdit.description = this.project?.description
    }
    if (projectEdit.listOfResponsibles == null) {
      projectEdit.listOfResponsibles = this.project?.users
    }
    if (projectEdit.groups == null) {
      projectEdit.groups = this.project?.groups
    }

    console.log(projectEdit);
    this.projectService.patchValue(projectEdit).subscribe((project: Project) => {
      console.log(projectEdit);
      
      this.alert.successAlert("Projeto modificado com sucesso")
    })
  }

  @Output()
  senderEmitter = new EventEmitter<Project>();

  emitCreation(project: Project) {
    console.log("dei emit");
    this.senderEmitter.emit(project);
  }

  getPlaceholderText(): string {
    if (this.typeString === 'projectInfo') {
      return 'Responsáveis do Projeto';
    } else {
      return 'Atribua responsáveis ao projeto';
    }
  }

}