import { Component, Input, OnInit } from '@angular/core';
import { Task, TaskCreate } from 'src/app/models/task';
import {  CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Property, PropertyKind, PropertyList, PropertyListKind } from 'src/app/models/property';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/models/user';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  project !: Project;

  @Input()
  team ?: Team;

  cols: any[] = [];

  taskList: Task[] = [];

  logged !: User;

  isNull !: boolean;

  statusProperty: any = {
    defaultValue: 'STATUS',
    id: 1,
    isObligated: true,
    kind: PropertyKind.STATUS,
    name: 'STATUS',
    propertyLists: [
      {id: 1, value: 'to-do default', color: 'RED', propertyListKind: PropertyListKind.TODO},
      {id: 2, value: 'doing default', color: 'YELLOW', propertyListKind: PropertyListKind.DOING},
      {id: 3, value: 'done default', color: 'GREEN', propertyListKind: PropertyListKind.DONE},
    ]
  };

  constructor(
    private userService: UserService, 
    private taskService: TaskService,
    private route: ActivatedRoute,
  ) {
    this.logged = userService.getLogged();
  }

  ngOnInit(): void {    
    //Define o primeiro campo da tabela como o nome
    //Adiciona nome e status como colunas padrão
    this.cols.push( 
      {
        field: "name",
        headerText: "Nome",
        width: '300px',
      },
      {
        id: this.statusProperty.id,
        field: this.statusProperty.kind,
        headerText: this.statusProperty.name,
        width: '300px'
      }
    );    
  
    if (this.project) this.getProject(); //atribui todas as tarefas do projeto a taskList
    else if (this.team) this.getTeam(); //atribui todas as tarefas da equipe a taskList
    else this.getAllTasks(); //atribui todas as tarefas do usuário para taskList
  }

  dropCard(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(
      this.taskList, 
      event.previousIndex, 
      event.currentIndex
    );
  }

  getProject(): void { //é chamado quando está na tela do espaço de trabalho
    this.taskList = this.project.tasks;//atribui para taskList todas as tarefas existentes no projeto
    this.getAllCols(); //recebe o restante das colunas com base nas propriedades do projeto
  }

  getTeam(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService
      .getAllByTeam(id)
      .subscribe((tl: Task[]) => {
        if (tl.length > 0) {
          this.isNull = false;
          this.taskList = tl;
        }
        else this.isNull = true;
      }); //busca a equipe com base no id da url
      //busca todas as tarefas criadas dentro da equipe
  }

  getAllTasks(): void {
    this.taskService
      .getAllByUser(this.logged.id!)
      .subscribe((tl: Task[]) => {
        if (tl.length > 0) {
          this.isNull = false;
          this.taskList = tl;
        }
        else this.isNull = true;
      }) //busca todas as tarefas de equipes e projetos que possuem o usuário atual
      //--> talvez seja interessante fazer outra validação <--
  }

  getAllCols(): void { //no espaço de trabalho, cria as colunas com base nas propriedades do projeto
    if (this.project.properties) { //verifica se o projeto possui alguma propriedade
      this.project.properties.forEach((property) => { //iteração -> cada propriedade do projeto
        if (property.kind !== this.statusProperty.kind) { //evita repetição da coluna status, já adicionada no onInit
          const newCol: any = {
            id: property.id,
            field: property.kind,
            headerText: property.name,
            width: '300px',
          }
          this.cols.push(newCol);
        }
      });
    } 
  }

}