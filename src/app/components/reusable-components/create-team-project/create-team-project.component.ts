import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faImage, faX } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
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
import { defaultImage, defaultTeamImage } from 'src/assets/data/defaultImg';

@Component({
  selector: 'app-create-team-project',
  templateUrl: './create-team-project.component.html',
  styleUrls: ['./create-team-project.component.scss']
})
export class CreateTeamProjectComponent implements OnInit {
  faImage = faImage;
  faX = faX;
  modalCopyLink: boolean = false;
  defaultImg: string = defaultTeamImage;

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
  dependency !: string
  review !: string
  showResponsibles: boolean = false;
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
    private translate : TranslateService
  ) {
    this.logged = this.userService.getLogged();
  }

  listOfResponsibles: TreeNode[] = [];
  selectedUsers: TreeNode[] = [];

  ngOnInit(): void {
    console.log(this.typeString);
    

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      listOfResponsibles: [null],
      projectReviewENUM: [null],
      groups: [null],
      projectDependency: [null],
    });

    this.base64 = this.defaultImg;

    if(this.team || this.project){
      this.projectExists();
    }
  }

  optionsReview = [
    'Sem revisão',
    'Revisão obrigatória',
    'Revisão opcional'
  ]


  project2 !: Project
  projectExists() {
    let id = 0;
    if (this.project != null) { 
      
      this.projectNull = false;
      if (this.project.file != null) {
        this.base64 = this.project.file!.file;
      }
      this.projectService.getOneById(this.project.id).subscribe((project: Project) => {
        if (project.projectDependency != null) {
          this.dependency = project.projectDependency.name;
        } else {
          this.dependency = "Atribue dependência"
        }
        this.convertType(project);
      })  
      id = this.project.idTeam;

    } else {
      const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
      id = teamId;
      this.dependency = "Atribue dependência"
      this.review = "Selecione revisão"
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
  }

  @Output()
  sendTeam = new EventEmitter<Team>()

  createTeam(): void {
    const team = this.form.getRawValue() as Team;
    team.creator = this.logged;

    this.teamService
      .create(team)
      .subscribe((teamRes: Team) => {
        this.alert.successAlert(this.translate.instant("equipe") + teamRes.name + this.translate.instant("alerts.success.createdWithSuccess"));

        if (this.fd) {
          this.teamService
            .updateImage(teamRes.id!, this.fd)
            .subscribe((teamImage: Team) => {
              this.sendTeam.emit(teamImage);
            });
        } else {
          this.sendTeam.emit(teamRes);
        }
      })
  }


  createProject(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
      let project = this.form.getRawValue() as Project;

      if(project.listOfResponsibles != null){
        this.verifyTypeAndDependencies(project, null!);
      }

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
      this.projectService
      .create(project, teamId)
      .subscribe((projectRes: Project) => {
        if (this.fd) {
          this.projectService
          .updateImage(projectRes.id, this.fd)
          .subscribe((projectResImage: Project) => {
            this.emitCreation(projectResImage);
          });
        } else {
          this.emitCreation(projectRes)
        }
        this.alert.successAlert(this.translate.instant("alerts.success.projectCreatedWithSuccess"));
      });
  
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
  convertType(project: Project): void {   
    if(project.projectReviewENUM.toString() === 'MANDATORY'){
      this.review = 'Revisão obrigatória'
    }else if(project.projectReviewENUM.toString() === 'OPTIONAL'){
      this.review = 'Revisão opcional'
    }else if(project.projectReviewENUM.toString() === 'EMPTY'){
      this.review = 'Sem revisão'
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

  closeScreen(): void {
    this.close.emit();
  }

  private getUsers(teamId: number): void {
    this.teamService.getUsers(teamId).subscribe((users: User[]) => {
      for (const user of users) {
        if (this.logged.id != user.id) {
          user.label = user.firstName + " " + user.lastName;
          this.listOfResponsibles.push(user);
        }
        if (this.project != null) {
          this.returnAllUsers(user)
        }
      }
      if (this.listOfResponsibles!.length > 0) {
        this.showResponsibles = true;
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
        group.label = "Grupo " + group.name
        this.listOfResponsibles.push(group)
        if (this.project != null) {
          this.returnAllGroups(group)
        }
      }
      if (this.listOfResponsibles!.length > 0) {
        this.showResponsibles = true;
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
 
    if(project.listOfResponsibles != null){
      if(project.listOfResponsibles.length > 0){
        this.verifyTypeAndDependencies(project, projectEdit);
      }
    } else {
      projectEdit.users = [];
      projectEdit.groups = [];
    }
    if(projectEdit.projectDependency != null){
      projectEdit.projectDependency.properties = [];
      projectEdit.projectDependency.tasks = []
    }

    let reviewConfig = this.form.get('projectReviewENUM');
    console.log(this.convertTypeString(reviewConfig?.value)!);
    
    projectEdit.projectReviewENUM = this.convertTypeString(reviewConfig?.value)!;
    console.log(projectEdit.projectReviewENUM);
    

    
    this.projectService.patchValue(projectEdit).subscribe((projectRes: Project) => {
      if (this.fd) {
        this.projectService
        .updateImage(projectRes.id, this.fd)
        .subscribe((projectResImage: Project) => {
          this.emitCreation(projectResImage);
        });
      } else {
        this.emitCreation(projectRes)
      }
      this.alert.successAlert(this.translate.instant("alerts.success.projectModifyWithSuccess"))
    });
  }
  

  verifyTypeAndDependencies(project: Project, projectEdit: ProjectEdit) {
    let users: User[] = [];
    let groups: Group[] = [];

    if (project.projectDependency != null) {
      project.projectDependency.properties = [];
      project.projectDependency.tasks = []
    }

    console.log(project.listOfResponsibles);
    
    project.listOfResponsibles.forEach(type => {
      if (type instanceof Group) {
        let group: Group = type as Group;
        group.children = [];
        groups.push({ ...group });
      } else {
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