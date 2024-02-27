import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{

  constructor(
    private router: Router,
    private alertService : AlertService
  ) { }
  
  @Input()
  teams ?: Team[]; //se estiver na home

  @Input()
  team ?: Team; //se estiver na tela projetos

  @Input()
  type !: string;

  @Output()
  deleteEmitterTeam: EventEmitter<Team> = new EventEmitter<Team>();

  @Output()
  deleteEmitterProject: EventEmitter<Project> = new EventEmitter<Project>();

  delete: boolean = false;

  ngOnInit(): void {        
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

  deleteBoolean(): void {
    this.delete = !this.delete
  }

  deleteEmitProject(project: Project): void {
    this.deleteEmitterProject.emit(project);
  }

  deleteEmitTeam(team: Team){
    this.deleteEmitterTeam.emit(team)
  }

  validatingDeleteProject(project: Project, answer: boolean): void{
    if(answer === true){
      this.deleteEmitProject(project)
    }else {
      this.alertService.notificationAlert("Projeto não removido")
    } 
  }

  validatingDeleteTeam(team:Team, answer: boolean): void{
    if(answer === true){
      this.deleteEmitTeam(team)
    }else {
      this.alertService.notificationAlert("Equipe não removida!")
    } 
  }
}