import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invitation-page',
  templateUrl: './invitation-page.component.html',
  styleUrls: ['./invitation-page.component.scss']
})
export class InvitationPageComponent {


  constructor(private teamService: TeamService, private route: ActivatedRoute, private router : Router) {

    let userLogged = JSON.parse(localStorage.getItem('logged') || '{}');
    const id = Number(this.route.snapshot.paramMap.get('idTeam'));
    this.teamService.userIsOnTeam(userLogged.id, id).subscribe(
      (res) => {
        if(res){
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

  // to-do: add user to team
  addUserOnTeam() {
    let userLogged = JSON.parse(localStorage.getItem('logged') || '{}');
    console.log(userLogged);

    const id = Number(this.route.snapshot.paramMap.get('idTeam'));

    console.log(id);




    this.teamService.addUserOnTeam(userLogged.id, id).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    )


  }

}
