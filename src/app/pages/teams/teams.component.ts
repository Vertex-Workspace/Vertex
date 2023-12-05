import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs';
import { Team } from 'src/app/models/team';
import { AlertService } from 'src/app/services/alert.service';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit{

  logged !: User;

  recentTeams !: Team[];
  
  constructor(
    public userService : UserService, 
    public teamService: TeamService
  ) {
    this.logged = this.userService.getLogged();
    
  }

  ngOnInit(): void {
    this.getRecentsTeams();
    console.log(this.logged);
    
  }

  isCreating: boolean = false;
  clicked: string = 'task';
  menuItems = [
    { id: 'task', iconClass: 'pi pi-list', label: 'Tarefas' },
    { id: 'team', iconClass: 'pi pi-users', label: 'Equipes' },
  ];

  teams: Team[] = [];

  createTeam(team: Team): void {
    team.creator = this.logged;
    this.teamService
      .create(team)
      .subscribe((team: Team) => {
        console.log(team);
      });
  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
    if (this.clicked == "team") {
      this.teamService.getAll().subscribe((teams) => {
        this.teams = teams;
      });
    } else {
      this.teams = [];
    }
  }

  switchCreateView(): void {
    this.isCreating = !this.isCreating;
    if (!this.isCreating) {
      this.teamService.getAll().subscribe((teams) => {
        this.teams = teams;
      });
    } else {
      this.teams = [];
    }
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
        console.log(this.logged.id!);
        
        this.recentTeams = teams;
      });
  }


}
