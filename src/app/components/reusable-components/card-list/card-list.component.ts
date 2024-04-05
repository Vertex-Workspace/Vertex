import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/class/team';
import { Project } from 'src/app/models/class/project';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { faTrashCan, faGear } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/class/user';

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
  }

  faTrashCan = faTrashCan;
  faGear = faGear

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

  loggedUser?: User

  image!: string


  ngOnInit(): void {
    this.findAllTeams()
  }

  getType(): any[] {
    if (this.type === 'project') {
      return this.projects
    }
    return this.teams!;
  }

  openTeam(id: number) {
    console.log(id);

    if (this.type === 'team') {
      this.router.navigate([`/equipe/${id}/projetos`]);
    } else {
      this.router.navigate([`/projeto/${id}/tarefas`])
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


  emitItem(event: boolean) {
    if (this.teams) {
      this.deleteTeam(this.itemToDelete)
    }
    if (this.projects) {
      this.deleteProject(this.itemToDelete)
    }
    // if (event) {
    //   this.emitterItem.emit(this.itemToDelete)
    // }
    this.delete = false;
  }

  findAllTeams() {
    this.teamService.getTeamsByUser(this.userService.getLogged()).subscribe((teams: Team[]) => {
      for (let i = 0; i < teams.length; i++) {
        this.teamService.getTeamCreator(teams[i]).subscribe((userC) => {

          if (teams[i].name === "Equipe " + userC.firstName) {
            this.creatorName = userC.firstName
            this.firstLetterName = userC.firstName?.substring(0, 1).toLocaleUpperCase()
          }
        })
      }
    })
  }

  findProjects(teamId: number) {
    this.loggedUser = this.userService.getLogged();
    // this.teamService.getOneById(this.team.)
    console.log(teamId, this.loggedUser);

    this.projectService.getProjectByCollaborators(teamId, this.loggedUser).subscribe((projects: Project[]) => {
      this.projects = projects
    })

  }

  getFirstLetter(item: any): string {
    return item.name.substring(0, 1).toLocaleUpperCase();
  }

  openModal: boolean = false;
  project !: Project

  openInformations(project: Project) {
    this.project = project;
    this.teamService.getOneById(this.project.idTeam).subscribe((team: Team) => {
      this.team = team;
      this.projectService.getOneById(project.id).subscribe((project: Project) => {
        this.project = project
      })
    })
    this.openModal = !this.openModal;
  }

  click() {
    for (const project of this.projects) {
      this.projectService.getFileId(project.id).subscribe((string1: number) => {
        this.projectService.getImage(string1).subscribe((string2: string) => {
        },
          (error: any) => {
            project.image = error.error.text
          }
        )
      })
    }
  }

  deleteProject(projectId: Project): void {
    this.projectService
      .delete(projectId.id)
      .subscribe((project) => {
        this.projects.splice(this.projects.indexOf(projectId), 1)
      },
        e => {
        });
  }

  deleteTeam(teamId: Team): void {
    console.log(teamId);

    this.teamService
      .delete(teamId.id)
      .subscribe((team) => {
        this.teams?.splice(this.teams.indexOf(teamId), 1)
      },
        e => {
        });
  }

}