import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/models/class/team';
import { AlertService } from 'src/app/services/alert.service';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/models/class/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  logged !: User;

  recentTeams !: Team[];

  teams !: Team[];

  isCreating !: boolean;
  clicked !: string;

  //TASKS - FILTER AND ORDER
  filterSettings !: any[];
  orderSettings !: any[];

  configItems !: any[];

  filterOpen !: boolean;
  orderOpen !: boolean;

  menuItems !: any[];

  private teamsSubscription !: Subscription;
  
  constructor(
    private userService : UserService, 
    private teamService: TeamService,
    private alert: AlertService
  ) {
    this.logged = this.userService.getLogged();   
  }

  ngOnInit(): void { 
    this.setDefaultValues();
    this.subscribeToTeams(); 
  }

  setDefaultValues(): void {
    this.teams = [];
    this.recentTeams = [];  
    this.isCreating = false;
    this.clicked = 'task';    
    this.filterSettings = [];
    this.orderSettings = [];
    this.configItems = [
      { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
      { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
    ];
    this.menuItems = [
      { id: 'task', iconClass: 'pi pi-list', label: 'Tarefas' },
      { id: 'team', iconClass: 'pi pi-users', label: 'Equipes' },
    ];
    this.filterOpen = false;
    this.orderOpen = false;
  }

  ngOnDestroy(): void {
    if (this.teamsSubscription) {
      this.teamsSubscription.unsubscribe();
    }
  }

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
    this.updateList();
  }

  updateList(): void {
    if (!this.isCreating) {
      this.teamService
        .getTeamsByUser(this.logged.id!)
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
  }

  clickOrder(): void {
    this.orderOpen = !this.orderOpen;
  }

}
