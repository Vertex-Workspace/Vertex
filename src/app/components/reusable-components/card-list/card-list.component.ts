import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{


  constructor(private teamService: TeamService) { 

  }
  teams?: Team[];

  ngOnInit(): void {
    this.teamService.getAll().subscribe((teams) => {
      this.teams = teams;
      console.log(teams);
    });
  }

  delete: boolean = false;

  // it will be an input
  // teams = [
  //   {image: '../../../../assets/teste/teste.jpg', name: 'AKMO', date: '06/06/2023', leader: 'Otávio Miguel Rocha'},
  //   {image: '../../../../assets/teste/teste.jpg', name: 'AKMO', date: '06/06/2023', leader: 'Otávio Miguel Rocha'},
  //   {image: '../../../../assets/teste/teste.jpg', name: 'AKMO', date: '06/06/2023', leader: 'Otávio Miguel Rocha'},
  //   {image: '../../../../assets/teste/teste.jpg', name: 'AKMO', date: '06/06/2023', leader: 'Otávio Miguel Rocha'},
  //   {image: '../../../../assets/teste/teste.jpg', name: 'AKMO', date: '06/06/2023', leader: 'Otávio Miguel Rocha'},
  //   {image: '../../../../assets/teste/teste.jpg', name: 'AKMO', date: '06/06/2023', leader: 'Otávio Miguel Rocha'},
  //   {image: '../../../../assets/teste/teste.jpg', name: 'AKMO', date: '06/06/2023', leader: 'Otávio Miguel Rocha'},
  //   {image: '../../../../assets/teste/teste.jpg', name: 'AKMO', date: '06/06/2023', leader: 'Otávio Miguel Rocha'},
  //   {image: '../../../../assets/teste/teste.jpg', name: 'AKMO', date: '06/06/2023', leader: 'Otávio Miguel Rocha'},
  //   {image: '../../../../assets/teste/teste.jpg', name: 'AKMO', date: '06/06/2023', leader: 'Otávio Miguel Rocha'},
  // ];

  idTeamWillBeDeleted!: number;
  showModalDelete(idTeam: number | undefined): void {
    this.delete = !this.delete;
    if(this.delete && idTeam){
      this.idTeamWillBeDeleted = idTeam;
    } else{
      this.idTeamWillBeDeleted = 0;
    }
  }

  deleteTeam(operation: any) {
    if(operation){
      console.log("deletou");
      this.teamService.delete(this.idTeamWillBeDeleted).subscribe((team) => {
        console.log(team);
      });
    }
  }
}
