import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { LogarithmicScale } from 'chart.js';
import { TreeNode } from 'primeng/api';
import { Group } from 'src/app/models/class/groups';
import { Project, ProjectCollaborators, ProjectEdit } from 'src/app/models/class/project';
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
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      listOfResponsibles: [null],
      groups: [null]
    });
  }

  listOfResponsibles: TreeNode[] = []
  selectedUsers: TreeNode[] = [];
  selectedUsers2: TreeNode[] = [];
  clicked: boolean = false

  ngOnInit(): void {
    this.projectExists()
  }

  projectNull: boolean = true;
  name !: string
  description?: string
  usersGroup !: User[];

  projectExists() {
    if (this.project != null) {
      this.projectNull = false;
      this.name = this.project.name;
      this.description = this.project.description;

      this.projectService.returnAllCollaborators(this.project.id).subscribe((pc: ProjectCollaborators) => {
        console.log(pc);
      })
      this.getGroups(this.project.idTeam)
      this.getUsers(this.project.idTeam)

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
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.closeModal) {
      let project = this.form.getRawValue() as Project;

      let users: User[] = [];
      let groups: Group[] = [];

      project.listOfResponsibles?.forEach((type => {
        if (type instanceof Group) {
          let group: Group = type as Group;
          group.selected = true;
          group.children = []
          groups.push(group)
        } else if (type instanceof User) {
          let user: User = type as User;
          user.selectedProject = true;
          if (!users.some(existingUser => existingUser.id === user.id)) {
            users.push(user);
          }
        }
      }));
      project.groups = groups;
      project.users = users;

      if (project.groups.length === 0) {
        project = this.removeCircularReferences(project);
      }

      project.creator = {
        user: {
          id: this.logged.id!
        },
        team: {
          id: teamId
        }
      };

      console.log(project);

      this.projectService
        .create(project, teamId)
        .subscribe((projectResponse: Project) => {

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

  removeCircularReferences(obj: any): any {
    const seen = new WeakSet();
    const replacer = (key: string, value: any) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
    return JSON.parse(JSON.stringify(obj, replacer));
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

  closeModal?: boolean
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
        if (this.logged.id != user.id) {
          this.listOfResponsibles.push(user);
        }
        if (this.project != null) {
          this.projectService.returnAllCollaborators(this.project.id).subscribe((pc: ProjectCollaborators) => {
            for (const user2 of pc.users) {
              if (user2.id === user.id) {
                this.selectedUsers.push(user)
              }
            }
          })
        }
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
            this.projectService.returnAllCollaborators(this.project.id).subscribe((pc: ProjectCollaborators) => {
              for (const user2 of users) {
                for (const user of pc.userInGroups) {
                  if (user2.id == user.id) {
                    this.selectedUsers.push(user2)
                  }
                }
              }
              for (const group2 of pc.groups) {
                if (group2.id == group.id) {
                  this.selectedUsers.push(group);
                }
              }
            })
          }
        })
      }
    });
    console.log(this.selectedUsers);
  }

  optionsReview = [
    { name: 'Revisão obrigatória' },
    { name: 'Revisão não obrigatória' },
    { name: 'Revisão opcional' }
  ]

  updateProject(): void {
    let project = this.form.getRawValue() as Project;
    let users: User[] = [];
    let groups: Group[] = [];

    project.listOfResponsibles.forEach(type => {
      if (type instanceof Group) {
        let group: Group = type as Group;
        group.selected = true;
        group.children = []; // Limpa a referência circular aqui
        groups.push({ ...group }); // Cria uma cópia do objeto
      } else if (type instanceof User) {
        let user: User = type as User;
        user.selected = true;
        if (!users.some(existingUser => existingUser.id === user.id)) {
          users.push({ ...user }); // Cria uma cópia do objeto
        }
      }
    });

    let projectEdit: ProjectEdit = {
      id: this.project?.id,
      name: project.name,
      description: project.description,
      users: users,
      groups: groups
    };

    projectEdit = this.removeCircularReferences(projectEdit);

    if (!projectEdit.name) {
      projectEdit.name = this.project?.name;
    }
    if (!projectEdit.description) {
      projectEdit.description = this.project?.description;
    }

    this.projectService.patchValue(projectEdit).subscribe((project: Project) => {
      projectEdit = project
      this.alert.successAlert("Projeto modificado com sucesso");
    });
  }


  @Output()
  senderEmitter = new EventEmitter<Project>();

  emitCreation(project: Project) {
    this.senderEmitter.emit(project);
  }

  getPlaceholderText(): any {
    if (this.typeString === 'projectInfo') {
      return;
    } else {
      return 'Atribua responsáveis ao projeto';
    }
  }

  seeCollaborators(): void {
    this.clicked = true
  }

  checkUserinGroup: User[] =[]

  checkTheResp(event: any, userReceived: any) {
    if (userReceived instanceof User) {
      this.selectedUsers.forEach(type => {
        if (type instanceof User) {
          let user: User = type as User;
          this.checkUserinGroup.push(user)
        }
      })
    }
      
      // for(const user of this.checkUserinGroup){
      //   if(user.id === userReceived.id){
      //     this.selectedUsers.splice(this.selectedUsers.indexOf(user),1)
      //     this.selectedUsers.splice(this.selectedUsers.indexOf(userReceived),1)
      //   }
      // }
  }
}