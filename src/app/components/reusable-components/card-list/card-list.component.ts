import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { AlertService } from 'src/app/services/alert.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{



  constructor(
    private teamService: TeamService, 
    private route: Router,
    private alert: AlertService
  ) { }
  
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

  deleteTeam(operation: boolean) {
    if (operation) {
      this.teamService
      .delete(this.idTeamWillBeDeleted)
      .subscribe((team: Team) => {
        this.alert.successAlert(`Equipe ${team.name} deletada com sucesso!`);
      });
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
