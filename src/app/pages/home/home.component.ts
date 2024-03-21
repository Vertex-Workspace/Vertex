import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/models/class/team';
import { AlertService } from 'src/app/services/alert.service';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/models/class/user';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/class/task';
import { PropertyListKind } from 'src/app/models/class/property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  logged !: User;

  recentTeams !: Team[];

  teams !: Team[];

  teamSearch !: string;

  isCreating: boolean = false;

  //TASKS - FILTER AND ORDER
  selectedFilter !: any;
  filterDate !: string;
  filterOptions: any[] = [
    {name: 'Status', values: [
      {name: 'Não Iniciado', kind: PropertyListKind.TODO},
      {name: 'Em Andamento', kind: PropertyListKind.DOING},
      {name: 'Concluído', kind: PropertyListKind.DONE}
    ]},
    {name: 'Data', values: [{name: 'date-input'}]},
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
  teamsBackup: Team[] = [];
  
  constructor(
    private userService : UserService, 
    private teamService: TeamService,
    private alert: AlertService
  ) {
    this.logged = this.userService.getLogged();   
  }

  ngOnInit(): void { 
    this.subscribeToTeams();        
  }


  subscribeToTeams() {
    this.teamService.getTeamsByUser(this.logged)
    .subscribe((teams: Team[]) => {
      this.teams = teams;  
      this.teams.forEach(team =>  this.teamsBackup.push(new Team(team)));
    });
  }

  switchCreateView(): void {
    this.isCreating = !this.isCreating;
    this.updateList();
  }

  updateList(): void {
    if (!this.isCreating) {
      this.teamService
        .getTeamsByUser(this.logged)
        .subscribe((teams: Team[]) => {
          this.teams = teams;
        });
    }
  }

  delete(team : Team): void {
    // this.userService.getOneByEmail(team.creator.email).subscribe((user: User) => {
    //   this.userCreator = user;
    //   console.log(user); 
    // })
  
    
    this.teamService
      .delete(team.id)
      .subscribe((team: Team) => {
        this.alert.successAlert('Equipe removida com sucesso!');
        this.teams?.splice(this.teams.indexOf(team), 1);
      },
      e => {
        this.alert.errorAlert('Erro ao deletar equipe!')
      });
  }

  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
    this.selectedFilter = '';
    this.filterDate = '';
  }

  clickOrder(): void {
    this.orderOpen = !this.orderOpen;
  }


  taskOpen: boolean = false;
  taskOpenObject!: Task;
  changeModalTaskState(bool: boolean, task: Task): void {
    if(bool == false){
      this.taskOpenObject = {} as Task;
      this.taskOpen = false;
      return;
    } else {
      this.taskOpen = true;
      this.taskOpenObject = task;
    }
  }


}