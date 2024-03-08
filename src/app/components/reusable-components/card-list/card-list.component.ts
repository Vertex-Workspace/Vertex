import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/class/team';
import { Project } from 'src/app/models/class/project';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  constructor(
    private router: Router,
    private teamService: TeamService,
    private userService: UserService
  ) { }

  faTrashCan = faTrashCan;
  
  @Input()
  teams?: Team[]; //se estiver na home

  @Input()
  team?: Team; //se estiver na tela projetos

  @Input()
  type !: string;

  @Input()
  teamScreen !: string;

  @Output()
  emitterItem = new EventEmitter();

  itemToDelete: any

  delete: boolean = false;

  
 firstLetterName?: string

 creatorName ?: String


  ngOnInit(): void {
    this.findAllTeams()
  }

  getType(): any[] {
    if (this.type === 'project') {
      return this.team?.projects!;
    }
    return this.teams!;
  }

  openTeam(id: number) {
    if (this.type === 'team') {
      this.router.navigate([`/equipe/${id}/projetos`]);
    } else {
      this.router.navigate([`/projeto/${id}/tarefas`])
    }
  }

  openModalDelete(item: any) {
    this.delete = !this.delete
    this.itemToDelete = item
  }


  emitItem(event: boolean) {
    if (event) {
      this.emitterItem.emit(this.itemToDelete)
    }
    this.delete = false;
  }

  findAllTeams() {
    this.teamService.getTeamsByUser(this.userService.getLogged()).subscribe((teams: Team[]) => {
      for (let i = 0; i < teams.length; i++) {
        this.teamService.getTeamCreator(teams[i]).subscribe((userC) => {
          
          if (teams[i].name === "Equipe " + userC.firstName) {
            this.creatorName = userC.firstName
            this.firstLetterName = userC.firstName?.substring(0, 1).toLocaleUpperCase()       
          }
        })
      }
    })
  }

  

}