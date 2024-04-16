import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/class/team';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/class/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invitation-page',
  templateUrl: './invitation-page.component.html',
  styleUrls: ['./invitation-page.component.scss']
})
export class InvitationPageComponent {


  userLogged!: User;
  team!: Team;
  
  constructor(
    private teamService: TeamService, 
    private route: ActivatedRoute, 
    private router: Router,
    private userService : UserService) {

    this.userLogged = userService.getLogged();
    const id = Number(this.route.snapshot.paramMap.get('idTeam'));
    this.teamService.userIsOnTeam(this.userLogged.id!, id).subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['home']);
        }
    });


  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('idTeam'));
    this.teamService.getOneById(id).subscribe((team : Team) => {
      this.team = team
      console.log(this.team);
    });
    
   
  }

  join(){

  }
  deny(){
    this.router.navigate(['home']);
  }

  async addUserOnTeam() {
    let userLogged = JSON.parse(localStorage.getItem('logged') || '{}');
    const id = Number(this.route.snapshot.paramMap.get('idTeam'));
    
    this.teamService.addUserOnTeam(userLogged.id, id).subscribe(
      (res) => {
        console.log('aqui'); 
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
  getFirstLetter(item: any): string {
    if(item.name != null){
      return item.name.substring(0, 1).toLocaleUpperCase();
    }
    return "E";
  }
}
