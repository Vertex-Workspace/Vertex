import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{

  constructor(
    private router: Router,
    private alertService : AlertService,
    private projectService: ProjectService
  ) { }
  
  @Input()
  teams ?: Team[]; //se estiver na home

  @Input()
  team ?: Team; //se estiver na tela projetos

  @Input()
  type !: string;

  @Output()
  emitterItem = new EventEmitter();

  itemToDelete: any

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

  openModalDelete(item:any){
    this.delete = !this.delete
    this.itemToDelete = item  
  }


  emitItem(){
    this.emitterItem.emit(this.itemToDelete)
    this.delete = false;
  }
}