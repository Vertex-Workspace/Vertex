import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{



  constructor(private teamService: TeamService, private route: Router) { 

  }
  
  @Input()
  teams!: Team[];

  ngOnInit(): void {}

  delete: boolean = false;

  idTeamWillBeDeleted!: number;
  showModalDelete(idTeam: number | undefined): void {
    this.changeModalState();
    if(this.delete && idTeam != undefined){
      this.idTeamWillBeDeleted = idTeam;
    } else{
      this.idTeamWillBeDeleted = 0;
    }
  }

  deleteTeam(operation: any) {
    if(operation){
      this.teamService.delete(this.idTeamWillBeDeleted).subscribe(
        (team) => {
          if(team == null){
            this.teams?.splice(this.teams.findIndex(team => team.id == this.idTeamWillBeDeleted), 1);
          }
        }
      );
    }
    this.changeModalState();
  }

  changeModalState(): void {
    this.delete = !this.delete;
  }

  openTeam(id: number|undefined) {
    this.teamService.getOneById(id!).subscribe(async(team) => {
      await localStorage.setItem('team', JSON.stringify(new Team(team)));
      this.route.navigate(['/projetos']);
    });
  }
}
