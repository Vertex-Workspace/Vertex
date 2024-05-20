import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task, TaskCreate } from 'src/app/models/class/task';
import {  CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/class/project';
import { Property, PropertyCreation, PropertyKind, PropertyList, PropertyListKind } from 'src/app/models/class/property';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';
import { Team } from 'src/app/models/class/team';
import { TeamService } from 'src/app/services/team.service';
import { Permission, User } from 'src/app/models/class/user';
import { BehaviorSubject, isEmpty, Observable } from 'rxjs';
import { PipeParams } from 'src/app/models/interface/params';
import { FilterParams } from 'src/app/models/interface/filter-params';
import { error } from 'jquery';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  project !: Project;

  @Input()
  queryFilter !: string;

  @Input()
  filter !: any;

  @Input()
  orderParams !: PipeParams;

  @Input()
  simplePropertyFilter !: FilterParams;
  
  properties : PropertyCreation[] = [
    {name: 'Status', kind: PropertyKind.STATUS},
    {name: 'Data', kind: PropertyKind.DATE},
  ];

  @Input()
  team ?: Team;

  @Input() permissions!:Permission[];
    
  cols: any[] = [];

  taskList: Task[] = [];

  logged !: User;

  isNull !: boolean;
  isProjectList !: boolean;

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
    private router: Router,
    private projectService: ProjectService,
    private loadingService: LoadingService,

  ) {
    this.logged = userService.getLogged();
  }

  ngOnChanges(){ 
    if(this.router.url.includes("tarefas")){
      this.updateGlobalValues();
    }
  }
  ngOnInit(): void {      
    this.updateGlobalValues();
  }

  isTaskPage(): boolean {
    return this.router.url.includes("tarefas");
  }

  translatePropertyListKey(value: string): string {
    return 'pages.tasks.kanban.key.' + value;
  }

  updateGlobalValues(): void {
    if (this.project) this.getProject(); //atribui todas as tarefas do projeto a taskList
    else if (this.router.url.includes("equipe")) this.getTeam(); //atribui todas as tarefas da equipe a taskList
    else this.getAllTasks(); //atribui todas as tarefas do usuário para taskList
  }


  @Output() openTaskDetails = new EventEmitter();
  openTaskModal(task: Task): void {
    this.openTaskDetails.emit(task);
  }

  dropCard(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
    this.projectService.updateIndex(this.project.id, this.taskList).subscribe(
      (task: Task[]) => {
        this.taskList = task;
      }, error => {
        console.log(error);
        moveItemInArray(this.taskList, event.currentIndex, event.previousIndex);
      }
    );
  }

  getProject(): void { //é chamado quando está na tela do espaço de trabalho
    this.taskList = this.project.tasks;//atribui para taskList todas as tarefas existentes no projeto
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
        if (tl) {
          this.taskList = tl;
        }
      })
      
  }

  updateTaskList(task: Task){
    this.taskList.splice(this.taskList.indexOf(task), 1);
  }

  @Input() shouldApplyZIndex : boolean = false;

  getStyles() {
    return {
      'width': 'full',
      'min-height': '50px',
      'display': 'flex',
      'position': 'sticky',
      'top': '0',
      'background-color': '$secondColor',
      'z-index': this.shouldApplyZIndex ? '98' : 'auto'
    };
  }


}