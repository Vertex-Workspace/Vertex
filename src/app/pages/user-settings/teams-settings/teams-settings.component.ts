import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUsers, faSearch, faCircleUser, faDoorOpen,
        faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
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
export class TeamsSettingsComponent{

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
    private alert: AlertService,
    private translate : TranslateService
  ) {
    this.getAllTeams();
  }

  teams !: Team[];
  teamLength: boolean = false;

  getAllTeams(): void {
    this.teamService
      .getTeamsByUser(this.userService.getLogged())
      .subscribe((teams) => {   
        this.teamLength = teams.length ==  0;
        this.teams = teams;
      });
  }
}