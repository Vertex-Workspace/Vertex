import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CardListComponent } from 'src/app/components/reusable-components/card-list/card-list.component';
import { Group } from 'src/app/models/class/groups';
import { Project } from 'src/app/models/class/project';
import { PropertyKind, PropertyListKind } from 'src/app/models/class/property';
import { Task } from 'src/app/models/class/task';
import { Team } from 'src/app/models/class/team';
import { Permission, User } from 'src/app/models/class/user';
import { PipeParams } from 'src/app/models/interface/params';
import { AlertService } from 'src/app/services/alert.service';
import { GroupService } from 'src/app/services/group.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { tutorialText } from 'src/app/tutorialText';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  isCreatingProject: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;
  clicked: string = 'project';
  logged !: User;
  team !: Team;
  tutorialText = tutorialText;

  //TASKS - FILTER AND ORDER
  selectedFilter !: string;
  filterOptions: any[] = [
    {name: 'Status', values: [
      {name: 'Não Iniciado', kind: PropertyListKind.TODO, status: true},
      {name: 'Em Andamento', kind: PropertyListKind.DOING, status: true},
      {name: 'Concluído', kind: PropertyListKind.DONE, status: true}
    ]},
    {name: 'Data', values: [
      {name: "Hoje", kind: PropertyKind.DATE as string, value: 'td' },
      { name: "Próxima semana", kind: PropertyKind.DATE as string, value: 'nw' },
      { name: "Próximo mês", kind: PropertyKind.DATE as string, value: 'nm'}
    ]},
  ];

  orderParams !: PipeParams;
  orderOptions : any = [
    { name: 'Nome', values: [
      { name: 'A-Z', type: 'name'  },
      { name: 'Z-A', type: 'name' }
    ]},
    { name: 'Data', values: [
      { name: 'Maior - Menor', type: 'date' },
      { name: 'Menor - Maior', type: 'date' }
    ] },
    { name: 'Status', values: [
      { name: 'Não Iniciado', type: 'status', kind: PropertyListKind.TODO },
      { name: 'Em Andamento', type: 'status', kind: PropertyListKind.DOING },
      { name: 'Concluído', type: 'status', kind: PropertyListKind.DONE },
    ] }
  ];


  queryFilter !: string;

  projectSearch !: string;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private userService: UserService,
    private teamService: TeamService,
    private router: Router,
  ) {
    this.logged = this.userService.getLogged();
  }


  permissionsOnTeam!: Permission[];
  permissionsOnTeamObservable!: Observable<Permission[]>;

  ngOnInit(): void {
    this.getTeam();
  }


  teamName: string = '';
  getTeam() {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService
    .getOneById(teamId)
    .subscribe((team: Team) => {
      this.team = team;
      this.teamName = team.name!;
      this.permissionsOnTeamObservable = this.teamService.getPermission(this.team.id, this.logged.id!);
      this.permissionsOnTeamObservable.subscribe((permissions: Permission[]) => {
        this.permissionsOnTeam = permissions;
        
      });
      this.getProjects();
    }, (error) => {
      this.router.navigate(['/home']);
      this.alert.errorAlert('Equipe inexistente!')
    });
  }



  delete(project: Project): void {
    this.projectService
      .delete(project.id)
      .subscribe(() => {
        this.alert.successAlert(`Projeto deletado com sucesso!`);
        this.team.projects?.splice(this.team.projects.indexOf(project),1)
      },
       e => {
         this.alert.errorAlert('Erro ao deletar projeto!');
       });
  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }

  projects: Project[] = []

  getProjects() {
    this.projectService.getProjectByCollaborators(this.team.id, this.logged).subscribe((projects: Project[]) => {
      this.projects = projects
    })
  }

  switchCreateView(): void {
    this.isCreatingProject = !this.isCreatingProject;
  }

  updateProjects(project: Project) {
    this.projects.push(project);
    this.switchCreateView();
  }

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
  ];

  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
    this.selectedFilter = '';
  }

  clickOrder(): void {
    this.orderParams = {name: '', type: ''};
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


  goTeamSettings():void{
    const route : string = 'equipe/' + this.team.id;
    this.router.navigate([route]);
  }
}