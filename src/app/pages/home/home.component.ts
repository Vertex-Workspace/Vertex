import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/models/team';
import { AlertService } from 'src/app/services/alert.service';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  logged !: User;

  recentTeams !: Team[];

  userCreator !: User
  teams: Team[] = [];

  private teamsSubscription !: Subscription;
  
  constructor(
    private userService : UserService, 
    private teamService: TeamService,
    private alert: AlertService
  ) {
    this.logged = this.userService.getLogged();   
  }

  ngOnInit(): void { 
    this.subscribeToTeams(); 
    this.getRecentsTeams();       
    
  }

  ngOnDestroy(): void {
    if (this.teamsSubscription) {
      this.teamsSubscription.unsubscribe();
    }
  }

  isCreating: boolean = false;
  clicked: string = 'task';

  menuItems = [
    { id: 'task', iconClass: 'pi pi-list', label: 'Tarefas' },
    { id: 'team', iconClass: 'pi pi-users', label: 'Equipes' },
  ];

  subscribeToTeams(): void {
    this.teamsSubscription = this.teamService.getAllTeams()
      .subscribe((teams: Team[]) => {
        this.recentTeams = teams;
        if (this.clicked === 'team') {
          this.teams = teams;
        }
      })
  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
    if (this.clicked == "team") {
      this.teamService.getTeamsByUser(this.logged.id!)
        .subscribe((teams) => {
          this.teams = teams;          
        });
    }    
  }

  switchCreateView(): void {
    this.isCreating = !this.isCreating;
  }

  updateList(): void {
    if (!this.isCreating) {
      this.teamService
        .getTeamsByUser(this.logged.id!)
        .subscribe((teams: Team[]) => {
          this.teams = teams;
        });
    } else {
      this.teams = [];
    }
  }

  delete(team : Team): void {
    this.teamService
      .delete(team.id)
      .subscribe((team: Team) => {
        this.alert.successAlert('Equipe removida com sucesso!');
        this.updateList()
      },
      e => {
        this.alert.errorAlert('Erro ao deletar equipe!')
      });
  }

  //TASKS - FILTER AND ORDER
  filterSettings: any[] = [];
  orderSettings: any[] = [];

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
  ];

  filterOpen: boolean = false;
  orderOpen: boolean = false;

  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
  }

  clickOrder(): void {
    this.orderOpen = !this.orderOpen;
  }

  getRecentsTeams(): void {
    this.teamService
      .getTeamsByUser(this.logged.id!)
      .subscribe((teams) => {        
        this.recentTeams = teams;
      });
  }

}
