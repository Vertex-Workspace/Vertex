import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { Team } from 'src/app/models/class/team';
import { AlertService } from 'src/app/services/alert.service';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/models/class/user';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/class/task';
import { PropertyKind, PropertyListKind } from 'src/app/models/class/property';
import { PipeParams } from 'src/app/models/interface/params';
import { JoyrideService } from 'ngx-joyride';
import { tutorialText } from 'src/app/tutorialText';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  logged !: User;
  tutorialText = tutorialText;

  teams !: Team[];
  teamsRender!: Observable<Team[]>;

  teamSearch !: string;

  isCreating: boolean = false;

  orderParams !: PipeParams;
  orderOptions: any = [
    {
      name: 'Nome', values: [
        { name: 'A-Z', type: 'name' },
        { name: 'Z-A', type: 'name' }
      ]
    },
    {
      name: 'Data', values: [
        { name: 'Maior - Menor', type: 'date' },
        { name: 'Menor - Maior', type: 'date' }
      ]
    },
    {
      name: 'Status', values: [
        { name: 'Não Iniciado', type: 'status', kind: PropertyListKind.TODO },
        { name: 'Em Andamento', type: 'status', kind: PropertyListKind.DOING },
        { name: 'Concluído', type: 'status', kind: PropertyListKind.DONE },
      ]
    }
  ];

  //TASKS - FILTER AND ORDER
  selectedFilter !: any;
  filterDate !: string;
  filterOptions: any[] = [
    {
      name: 'Status', values: [
        { name: 'Não Iniciado', kind: PropertyListKind.TODO, status: true },
        { name: 'Em Andamento', kind: PropertyListKind.DOING, status: true },
        { name: 'Concluído', kind: PropertyListKind.DONE, status: true }
      ]
    },
    {
      name: 'Data', values: [
        { name: "Hoje", kind: PropertyKind.DATE as string, value: 'td' },
        { name: "Próxima semana", kind: PropertyKind.DATE as string, value: 'nw' },
        { name: "Próximo mês", kind: PropertyKind.DATE as string, value: 'nm' }
      ]
    },
  ];
  orderSettings !: any[];
  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
  ];

  filterOpen !: boolean;
  orderOpen !: boolean;

  queryFilter !: string;

  faPlus = faPlusSquare;

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private readonly joyrideService: JoyrideService
  ) {
    this.logged = this.userService.getLogged();
  }

  ngOnInit(): void {
    this.subscribeToTeams();
  }


  updateOrderType(e: PipeParams): void {
    if (e.type) {
      this.orderParams.type = e.type;
    }

    if (e.kind) {
      this.orderParams.kind = e.kind;
    }
  }


  subscribeToTeams() {
    this.teamsRender = this.teamService.getTeamsByUser(this.logged);
    this.teamsRender.subscribe(teams => {
      console.log(teams);
      
      this.teams = teams
      this.joyrideService.startTour({
        steps: [
          'step1@home',
          `sidebar@home`,
          `header@home`,
          'step2@home',
          `step3@home`,
          `goToTeamPage@home`,
          `step4@equipe/${this.teams[0].id}/projetos`,
          `step5@equipe/${this.teams[0].id}/projetos`,
          `goToTasks@equipe/${this.teams[0].id}/projetos`,
          `step6@projeto/${this.teams[0].projects[0].id}/tarefas`,
        ],
      });
    });
  }

  switchCreateView(): void {
    this.isCreating = !this.isCreating;
  }

  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
    this.selectedFilter = '';
    this.filterDate = '';
  }

  clickOrder(): void {
    this.orderParams = { name: '', type: '' };
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

  updateTeams(team: Team) {
    this.teams.push(team);
    this.switchCreateView();
  }


}