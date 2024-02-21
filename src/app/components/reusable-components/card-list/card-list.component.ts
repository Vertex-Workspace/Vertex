import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{

  constructor(
    private router: Router,
  ) { }
  
  @Input()
  teams ?: Team[]; //se estiver na home

  @Input()
  team ?: Team; //se estiver na tela projetos

  @Input()
  type !: string;

  @Output()
  deleteEmitter: EventEmitter<Project> = new EventEmitter<Project>();

  @Output()
  deleteEmitterTeam: EventEmitter<Team> = new EventEmitter<Team>();

  delete: boolean = false;

  ngOnInit(): void {}

  getType(): any[] {
    if (this.type === 'project') {
      return this.team?.projects!;
    }
    return this.teams!;
  }

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
    this.changeModalState();
  }

  deleteEmit(project: Project): void {    
    this.deleteEmitter.emit(project)
  }

  deleteEmitTeam(team: Team): void {
    console.log(1);
    
    this.deleteEmitterTeam.emit(team)
  }

  changeModalState(): void {
    this.delete = !this.delete;
  }

  openTeam(id: number) {

    if (this.type === 'team') {
      this.router.navigate([`/equipe/${id}/projetos`]);      
    } else {
      this.router.navigate([`/projeto/${id}/tarefas/kanban`])
    }

    // this.teamService.getOneById(id!).subscribe(async(team) => {
    //   await localStorage.setItem('team', JSON.stringify(new Team(team)));
    //   this.router.navigate(['/projetos']);
    // });
  }
}
