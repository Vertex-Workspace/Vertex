import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/models/class/team';
import { AlertService } from 'src/app/services/alert.service';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/models/class/user';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  logged !: User;

  recentTeams !: Team[];

  teams !: Team[];

  isCreating: boolean = false;

  //TASKS - FILTER AND ORDER
  filterSettings !: any[];
  orderSettings !: any[];
  configItems !: any[];
  filterOpen !: boolean;
  orderOpen !: boolean;
  menuItems !: any[];

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
  }

  clickOrder(): void {
    this.orderOpen = !this.orderOpen;
  }


}