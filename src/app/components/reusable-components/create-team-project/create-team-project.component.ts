import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { TreeNode } from 'primeng/api';
import { Group } from 'src/app/models/class/groups';
import { Project, ProjectEdit, ProjectReview } from 'src/app/models/class/project';
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
    private translate : TranslateService
  ) {
    this.logged = this.userService.getLogged();
  }
  

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      listOfResponsibles: [null],
      projectReviewENUM: [this.convertType()]
    });
    this.projectExists()
    // this.markCollaboratorsAsSelected();
  }

  optionsReview = [
    "Revisão opcional",
    "Revisão obrigatória",
    "Sem revisão"
  ]

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
      this.confirmCreateTeam();
    } else if (this.typeString === 'project') {
      this.createProject();
    } 
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
        this.alert.successAlert(this.translate.instant("equipe") + teamRes.name + this.translate.instant("alerts.success.createdWithSuccess"));

        if (this.fd) {
          this.teamService
            .updateImage(teamRes.id!, this.fd)
            .subscribe();
        }
      })
  }

  createProject(): void {
    let project = this.form.getRawValue() as Project;

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
    
    let reviewConfig = this.form.get('projectReviewENUM')
    project.projectReviewENUM = this.convertTypeString(reviewConfig?.value)!;

    this.projectService
      .create(project, teamId)
      .subscribe((project: Project) => {
        this.alert.successAlert(this.translate.instant("alerts.success.projectCreatedWithSuccess"));
        if (this.fd) {
          this.projectService
            .updateImage(project.id, this.fd)
            .subscribe();
        }
      });
  }




  convertTypeString(reviewConfig: string): ProjectReview | undefined {
    switch (reviewConfig) {
      case 'Revisão opcional' :
        return ProjectReview.OPTIONAL;
      case 'Revisão obrigatória' :
        return ProjectReview.MANDATORY;
      case 'Sem revisão' :
        return ProjectReview.EMPTY;
    }
  }
  convertType(): string{
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

  closeScreen(): void {
    this.close.emit();
  }

  confirmCreateTeam(): void {
    this.modalCopyLink = true;
  }

  copyLink(): void {
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
          this.markCollaboratorsAsSelected(users)
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
            this.markCollaboratorsAsSelected(groups)
          }
        })
      }
    });
  }



  selectedUsers: any[] = [];

  markCollaboratorsAsSelected(usersAndGroups: any[]): void {
    this.selectedUsers = [];

    usersAndGroups.forEach(item => {
      if (item instanceof User) {
        let collaborator: User = item as User;
        this.selectedUsers.push({ label: collaborator.firstName, data: collaborator });
      } else if (item instanceof Group) {
        let group: Group = item as Group;
        this.selectedUsers.push({ label: group.name, data: group });
      }
    });
  }

  updateProject(): void {
    console.log("update");
    
    let project = this.form.getRawValue() as Project;
    let list: User[] = []

    const projectEdit: ProjectEdit = {
      id: this.project?.id,
      name: project.name,
      description: project.description,
      listOfResponsibles: project.listOfResponsibles,
    }

    projectEdit.listOfResponsibles!.forEach((type => {
      if (type instanceof Group) {
        let group: Group = type as Group;
        group.selected = true;
        this.userService.getUsersByGroup(group.id).subscribe((users: User[]) => {
          for (const user of users) {
            list.push(user)
          }
        });
      } else if (type instanceof User) {
        let user: User = type as User;
        user.selected = true
        list.push(user)
      }
    }));

    projectEdit.listOfResponsibles = list

    if (projectEdit.name == null) {
      projectEdit.name = this.project?.name
    }
    if (projectEdit.description == null) {
      projectEdit.description = this.project?.description
    }
    if (projectEdit.listOfResponsibles == null) {
      projectEdit.listOfResponsibles = this.project?.listOfResponsibles
    }

    let reviewConfig = this.form.get('projectReviewENUM');
    projectEdit.projectReviewENUM = this.convertTypeString(reviewConfig?.value)!;

    this.projectService.patchValue(projectEdit).subscribe((project: Project) => { 
      this.project = project;
      this.alert.successAlert(this.translate.instant("alerts.success.projectModifyWithSuccess"))
    });
    this.closeScreen();
  }
}