import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { LogarithmicScale } from 'chart.js';
import { TreeNode } from 'primeng/api';
import { Group } from 'src/app/models/class/groups';
import { Project, ProjectCollaborators, ProjectEdit, ProjectReview } from 'src/app/models/class/project';
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

  @Input()
  typeString!: String;

  @Input()
  project!: Project

  logged !: User;
  projectNull: boolean = true;
  dependency?: string

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
  }

  pDep !: Project
  listOfResponsibles: TreeNode[] = [];
  selectedUsers: TreeNode[] = [];
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      listOfResponsibles: [null],
      projectReviewENUM: [this.convertType()],
      groups: [null],
      projectDependency: [null],
    });
    this.projectExists()
  }

  optionsReview = [
    'Revisão obrigatória',
    'Revisão não obrigatória',
    'Revisão opcional'
  ]

  projectExists() {
    let id = 0;
    if (this.project != null) {
      this.projectNull = false;

      if (this.project.projectDependency != null) {
        this.dependency = this.project.projectDependency.name
        this.pDep = this.project.projectDependency
        // this.form.controls['projectDependency'].setValue(this.pDep)
      } else {
        this.dependency = "Atribue dependência"
      }
      id = this.project.idTeam;

    } else {
      const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
      id = teamId;
      this.dependency = "Atribue dependência"
    }
    this.getGroups(id);
    this.getUsers(id);
    this.getAllProjects(id);
  }



  onSubmit(): void {
    if (this.typeString === 'team') {
      this.createTeam()
    } else if (this.typeString === 'project') {
      this.createProject();
    } else if (this.typeString === 'projectInfo') {
      this.updateProject();
    }

    this.confirmCreateTeam();
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
      this.verifyTypeAndDependencies(project, null!);

      project.creator = {
        user: {
          id: this.logged.id!
        },
        team: {
          id: teamId
        }
      };

      let reviewConfig = this.form.get('projectReviewENUM')
      project.projectReviewENUM = this.convertTypeString(reviewConfig?.value)!;
      console.log(project);
      

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

  convertTypeString(reviewConfig: string): ProjectReview | undefined {
    switch (reviewConfig) {
      case 'Revisão opcional':
        return ProjectReview.OPTIONAL;
      case 'Revisão obrigatória':
        return ProjectReview.MANDATORY;
      case 'Sem revisão':
        return ProjectReview.EMPTY;
    }
  }
  convertType(): string {
    switch (this.project?.projectReviewENUM!) {
      case ProjectReview.OPTIONAL:
        return 'Revisão opcional';
      case ProjectReview.MANDATORY:
        return 'Revisão obrigatória';
      case ProjectReview.EMPTY:
        return 'Sem revisão';
    }
    return this.project?.projectReviewENUM!
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
    this.modalCopyLink = true;
  }

  copyLink(): void {
    this.closeScreen();
  }

  private getUsers(teamId: number): void {
    this.teamService.getUsers(teamId).subscribe((users: User[]) => {
      for (const user of users) {
        if (this.logged.id != user.id) {
          this.listOfResponsibles.push(user);
        }
        if (this.project != null) {
          this.returnAllUsers(user)
        }
      }
    });
  }

  private returnAllUsers(user: User) {
    this.projectService.returnAllCollaborators(this.project.id).subscribe((pc: ProjectCollaborators) => {
      for (const user2 of pc.users) {
        if (user2.id === user.id) {
          this.selectedUsers.push(user)
        }
      }
    })
  }

  private getGroups(teamId: number): void {
    this.groupService.getGroupsByTeam(teamId).subscribe((groups: Group[]) => {
      for (const group of groups) {
        group.label = "Grupo " + group.label
        this.listOfResponsibles.push(group)
        if (this.project != null) {
          this.returnAllGroups(group)
        }
      }
    })
  }

  returnAllGroups(group: Group) {
    this.projectService.returnAllCollaborators(this.project.id).subscribe((pc: ProjectCollaborators) => {
      for (const group2 of pc.groups) {
        if (group2.id == group.id) {
          this.selectedUsers.push(group);
        }
      }
    })
  }

  updateProject(): void {
    let project = this.form.getRawValue() as Project;

    let projectEdit: ProjectEdit = {
      id: this.project?.id,
      name: project.name,
      description: project.description,
      projectDependency: project.projectDependency
    };

    this.verifyTypeAndDependencies(project, projectEdit);

    let reviewConfig = this.form.get('projectReviewENUM');
    projectEdit.projectReviewENUM = this.convertTypeString(reviewConfig?.value)!;

    this.projectService.patchValue(projectEdit).subscribe((project: Project) => {
      this.alert.successAlert("Projeto modificado com sucesso");
    });
  }

  verifyTypeAndDependencies(project: Project, projectEdit: ProjectEdit) {
    let users: User[] = [];
    let groups: Group[] = [];

    if (project.projectDependency) {
      project.projectDependency.properties = [];
      project.projectDependency.tasks = []
    }

    project.listOfResponsibles.forEach(type => {
      if (type instanceof Group) {
        let group: Group = type as Group;
        group.children = [];
        groups.push({ ...group });
      } else if (type instanceof User) {
        let user: User = type as User;
        if (!users.some(existingUser => existingUser.id === user.id)) {
          users.push({ ...user });
        }
      }
    });

    if (projectEdit != null) {
      projectEdit.users = users;
      projectEdit.groups = groups;
    } else {
      project.users = users
      project.groups = groups;
    }
  }


  @Output()
  senderEmitter = new EventEmitter<Project>();

  emitCreation(project: Project) {
    this.senderEmitter.emit(project);
  }

  dependencies !: Project[]
  getAllProjects(teamId: number) {
    this.projectService.getProjectByCollaborators(teamId, this.userService.getLogged()).subscribe((projects: Project[]) => {
      this.dependencies = projects
      if (!this.projectNull) {
        this.dependencies.splice(this.dependencies.indexOf(this.project), 1)
      }
    })
  }

}