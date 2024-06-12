import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/class/team';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/class/user';
import { Observable } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invitation-page',
  templateUrl: './invitation-page.component.html',
  styleUrls: ['./invitation-page.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule
  ]
})
export class InvitationPageComponent {

  team!: Team;

  render: boolean = false;
  constructor(
    private teamService: TeamService, 
    private route: ActivatedRoute, 
    private router: Router,
    private userService : UserService,
    private translate : TranslateService,
    private alertService: AlertService
    ) {
      const id = Number(this.route.snapshot.paramMap.get('idTeam'));
      this.teamService.findInformationInvitationPage(id).subscribe((team : Team) => {
        this.team = team
        this.render = true;
      }, (error) => {
        this.router.navigate(['home'])
      }
    );
  }

  deny(){
    this.router.navigate(['home']);
  }

  addUserOnTeam() {
    const id = Number(this.route.snapshot.paramMap.get('idTeam'));
  
    this.teamService.addUserOnTeam(this.userService.getLogged().id, id).subscribe(
      (res) => {
        this.router.navigate(['home']);
        this.teamService.getOneById(id).subscribe(
          (team: Team) => {
            console.log(team);
            this.teamService.patchChat(team.chat!.id!, id, this.userService.getLogged().id).subscribe(
              (res) => {
                this.alertService.successAlert(this.translate.instant('addedToTeam') + res.name);
                console.log(res);
              },
              (error) => {
                console.log(error);
              }
            )
          },
          (error) => {
            console.log(error);
          }
        )
      },
      (error) => {
        console.log(error);
      }
    )


  }
  getFirstLetter(item: any): string {
    if(item.name != null){
      return item.name.substring(0, 1).toLocaleUpperCase();
    }
    return "E";
  }
}
