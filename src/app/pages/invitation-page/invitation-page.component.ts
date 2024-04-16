import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/class/team';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-invitation-page',
  templateUrl: './invitation-page.component.html',
  styleUrls: ['./invitation-page.component.scss'],
  standalone: true,
  imports: [
    TranslateModule
  ]
})
export class InvitationPageComponent {


  constructor(private teamService: TeamService, private route: ActivatedRoute, private router: Router) {

    let userLogged = JSON.parse(localStorage.getItem('logged') || '{}');
    const id = Number(this.route.snapshot.paramMap.get('idTeam'));
    this.teamService.userIsOnTeam(userLogged.id, id).subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['home']);
        }
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

  async addUserOnTeam() {
    let userLogged = JSON.parse(localStorage.getItem('logged') || '{}');
    const id = Number(this.route.snapshot.paramMap.get('idTeam'));

    this.teamService.addUserOnTeam(userLogged.id, id).subscribe(
      (res) => {
        this.router.navigate(['home']);
        this.teamService.getOneById(id).subscribe(
          (team: Team) => {
            console.log(team);
            this.teamService.patchChat(team.chat!.id!, id, userLogged.id).subscribe(
              (res) => {
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

}
