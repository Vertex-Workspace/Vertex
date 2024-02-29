import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/class/project';
import { Team } from 'src/app/models/class/team';
import { User } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  isCreating: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;
  clicked: string = 'task';

  recentProjects !: Project[];

  logged !: User;

  team !: Team;
  emptyTeamProjects !: boolean;

  //TASKS - FILTER AND ORDER
  filterSettings: any[] = [];
  orderSettings: any[] = [];

  menuItems = [
    { id: 'task', iconClass: 'pi pi-list', label: 'Tarefas' },
    { id: 'project', iconClass: 'pi pi-users', label: 'Projetos' },
  ];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private userService: UserService,
    private teamService: TeamService,
    private router: Router,
  ) {
    this.logged = this.userService.getLogged();
    this.getTeam();
  }

  ngOnInit(): void {
    this.validateProjectId();
    this.emptyTeamProjects = true;
  }

  getRecentProjects(team: Team): void {
    if (Array.isArray(team.projects)) {
      this.recentProjects = team.projects!;
    }
  }

  validateProjectId(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService
      .existsByIdAndUserBelongs(teamId, this.logged.id!)
      .subscribe((exists: boolean) => {  
        if (!exists) {
          this.router.navigate(['/home']);
          this.alert.errorAlert('Equipe inexistente!')
        }
      },
      e => {
        
      })
  
  }

  getTeam(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.teamService
      .getOneById(teamId)
      .subscribe((team: Team) => {
        this.team = team;
        this.getRecentProjects(team);
        if (team.projects) this.emptyTeamProjects = false;
      })      

  }

  delete(id: number): void {    
    this.projectService
      .delete(id)
      .subscribe((project: Project) => {
        this.alert.successAlert(`Projeto deletado com sucesso!`);
        this.team.projects?.splice(this.team.projects.indexOf(project), 1);
      },
      e => {
        this.alert.errorAlert('Erro ao deletar projeto!');
      });
  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }

  switchCreateView(): void {
    this.isCreating = !this.isCreating;
    this.updateList();
  }

  updateList(): void {
    this.getTeam();
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



}
