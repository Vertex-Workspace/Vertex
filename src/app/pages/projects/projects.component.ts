import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/class/groups';
import { Project } from 'src/app/models/class/project';
import { Task } from 'src/app/models/class/task';
import { Team } from 'src/app/models/class/team';
import { Permission, User } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { GroupService } from 'src/app/services/group.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  isCreatingProject: boolean = false;
  isCreatingGroup: boolean = false;
  isCreating: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;
  clicked: string = 'project';
  logged !: User;
  team !: Team;
  emptyTeamProjects !: boolean;

  //TASKS - FILTER AND ORDER
  filterSettings: any[] = [];
  orderSettings: any[] = [];


  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private userService: UserService,
    private teamService: TeamService,
    private groupService: GroupService,
    private router: Router,
  ) {
    this.logged = this.userService.getLogged();
  }


  permissionsOnTeam!: Permission[];
  permissionsOnTeamObservable!: Observable<Permission[]>;

  ngOnInit(): void {
    this.getTeam();
    this.validateTeamId();
  }

  validateTeamId(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService
      .existsByIdAndUserBelongs(teamId, this.logged.id!)
      .subscribe((exists: boolean) => {
        if (!exists) {
          this.router.navigate(['/home']);
          this.alert.errorAlert('Equipe inexistente!')
        }
      });
  }

  teamName: string = '';
  getTeam() {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService
      .getOneById(teamId)
      .subscribe((team: Team) => {
        this.team = team;
        this.teamName = team.name!;
        this.permissionsOnTeamObservable = this.teamService.getPermission(this.team, this.logged);
        this.permissionsOnTeamObservable.forEach((permissions: Permission[]) => {
          this.permissionsOnTeam = permissions;
          this.getProjects();
        });

        if (team.projects) this.emptyTeamProjects = false;
      });
  }




  deleteGroup(groupId: Group): void {
    this.groupService.delete(groupId.id).subscribe((group: Group) => {
      this.alert.successAlert('Grupo deletado com sucesso')
      this.team.groups?.splice(this.team.groups.indexOf(groupId), 1)
    },
      e => {
        this.alert.errorAlert("Não foi possível deletar");
      })
  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }

  projects: Project[] = []

  getProjects() {
    this.projectService.getProjectByCollaborators(this.team.id, this.logged).subscribe((projects: Project[]) => {
      this.projects = projects
      for (const project of this.projects) {
        console.log(project);

        this.projectService.getImage(project.id).subscribe((string1: string) => {
          
          project.image = string1
        },
          (error: any) => {
            project.image = error.error.text
            console.log(project.image);
          }
        )
      }
    })
  }

  switchCreateView(): void {
    this.isCreatingProject = !this.isCreatingProject;
  }

  updateProjects(project: Project) {
    this.projects.push(project)
  }

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
  ];

  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
  }

  clickOrder(): void {
    this.orderOpen = !this.orderOpen;
  }

  taskOpen: boolean = false;
  taskOpenObject!: Task;
  changeModalTaskState(bool: boolean, task: Task): void {
    if (bool == false) {
      this.taskOpenObject = {} as Task;
      this.taskOpen = false;
      return;
    } else {
      this.taskOpen = true;
      this.taskOpenObject = task;
    }
  }

}