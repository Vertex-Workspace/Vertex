import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUsers, faSearch, faCircleUser, faDoorOpen,
        faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { LogarithmicScale } from 'chart.js';
import { Team } from 'src/app/models/class/team';
import { User } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teams-settings',
  templateUrl: './teams-settings.component.html',
  styleUrls: ['./teams-settings.component.scss']
})
export class TeamsSettingsComponent implements OnInit{

  faUsers = faUsers;
  faSearch = faSearch;
  faCircleUser = faCircleUser;
  faDoorOpen = faDoorOpen;
  faPaperclip = faPaperclip;

  constructor(
    private userService : UserService, 
    private route: ActivatedRoute,
    private teamService: TeamService,
    private router: Router,
    private alert: AlertService
  ) {
    this.logged = this.userService.getLogged();  
    this.getAllTeams();
  }

  logged !: User;

  teams !: Team[];

  ngOnInit(): void {
    
  }

  getAllTeams(): void {
    this.teamService
      .getTeamsByUser(this.logged)
      .subscribe((teams) => {        
        this.teams = teams;
      });
  }
}