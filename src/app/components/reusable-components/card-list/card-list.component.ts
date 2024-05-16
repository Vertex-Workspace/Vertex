import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/class/team';
import { Project } from 'src/app/models/class/project';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { faTrashCan, faGear, faMessage, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/class/user';
//  import { StringFilterUI } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  constructor(
    private router: Router,
    private teamService: TeamService,
    private userService: UserService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.loggedUser = this.userService.getLogged();
  }

  faTrashCan = faTrashCan;
  faGear = faGear
  faMessage = faMessage;
  faDoorOpen = faDoorOpen;

  @Input()
  filterSearch !: string;


  @Input()
  teams?: Team[]; //se estiver na home

  @Input()
  team?: Team; //se estiver na tela projetos

  @Input()
  projects: Project[] = []

  @Input()
  type !: string;

  @Input()
  teamScreen !: string;

  @Output()
  emitterItem = new EventEmitter();

  itemToDelete: any

  delete: boolean = false;


  firstLetterName?: string

  creatorName?: String

  loggedUser!: User

  image!: string

  dependencyName !: string
  renderList: any[] = [];


  ngOnChanges(changes: SimpleChanges) {
    this.setRenderList();
  }

  ngOnInit(): void {
    this.setRenderList();
  }


  setRenderList() {
    if (this.type === 'project') {
      this.renderList = this.projects
    } else if (this.type === 'team') {
      this.renderList = this.teams!;
    }
  }

  updateProject(project: Project) {
    const projectTest: Project | undefined = this.projects.find((p) => p.id == project.id);
    if (projectTest !== undefined) {
      const index = this.projects.indexOf(projectTest);
      if (index !== -1) {
        this.projects.splice(index, 1, project); // Replace the old project with the updated one
        this.setRenderList();
      }
    }
    this.close();
  }

  openTeam(id: number) {
    if (this.type === 'team') {
      this.router.navigate([`/equipe/${id}/projetos`]);
    } else {
      this.projectService.getOneById(id).subscribe((project: Project) => {
        this.router.navigate([`/projeto/${id}/tarefas`])
      })
    }
  }

  openModalDelete(item: any) {
    this.delete = !this.delete
    this.itemToDelete = item
  }

  close() {
    this.openModal = !this.openModal;
    this.project = null!
  }

  hasImage(item: any) {
    if (this.type === 'team') {
      if (item.image != null) {
        return item.image != null
      }
    } else if (this.type === 'project') {
      if (item.file != null) {
        return item.file.file != null
      }
    }
    return false;
  }

  getImage(item: any) {
    if (!this.hasImage(item)) {
      return "";
    }
    let file: any;
    if (this.type === 'team') {
      file = item.image
    } else {
      file = item.file.file
    }
    return file;
  }


  emitItem(event: boolean) {
    if (this.teams && event) {
      this.deleteTeam(this.itemToDelete)
    }
    if (this.projects && event) {
      this.deleteProject(this.itemToDelete)
    }
    this.delete = false;
  }


  getFirstLetter(item: any): string {
    if (item.name != null) {
      return item.name.substring(0, 1).toLocaleUpperCase();
    }
    return "E";
  }

  openModal: boolean = false;
  project !: Project

  openInformations(project1: Project) {
    this.openModal = !this.openModal;
    this.project = project1;
    console.log(this.project);
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.project.idTeam = teamId
  }

  deleteProject(projectId: Project): void {
    this.projectService
      .delete(projectId.id)
      .subscribe((project) => {
        this.projects.splice(this.projects.indexOf(projectId), 1)
      });
  }

  deleteTeam(teamId: Team): void {
    this.teamService
      .delete(teamId.id)
      .subscribe((team) => {
        this.teams?.splice(this.teams.indexOf(teamId), 1)
      });
  }

  openTeamInformations(teamId: number) {
    this.router.navigate([`/equipe/${teamId}`])
  }

  leaveBool: boolean = false;
  itemTodelete !: Team

  openModalLeave(item: Team) {
    this.leaveBool = !this.leaveBool
    this.itemToDelete = item
  }

  leaveTeam(event: any) {
    if (event) {
      this.teamService.deleteUserTeam(this.itemToDelete, this.userService.getLogged()).subscribe((team: Team) => {
        this.team = team
        this.teams?.splice(this.teams.indexOf(team), 1)
      })
    }
    this.openModalLeave(null!)
  }

}