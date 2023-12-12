import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';
import { Task, TaskCreate } from 'src/app/models/task';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  filterSettings: any[] = [];
  orderSettings: any[] = [];
  clicked !: string;
  query: string = '';
  searchBarOpen: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;
  propertiesOpen: boolean = false;
  taskOpen: boolean = false;

  project!: Project;



  constructor(
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService
  ) { 
}

  async ngOnInit(): Promise<void> {
    let projectRequested : Project | undefined = await this.projectService.getOneById(1).toPromise();
    console.log(projectRequested);
    if(projectRequested){
      this.project = projectRequested;
    }
    this.clicked = "Kanban";
  }

  menuItems = [
    { id: 'Kanban', iconClass: 'pi pi-th-large', label: 'Kanban' },
    { id: 'List', iconClass: 'pi pi-list', label: 'Lista' },
    { id: 'Calendar', iconClass: 'pi pi-calendar', label: 'Calendário' },
    { id: 'Mural', iconClass: 'pi pi-chart-bar', label: 'Mural' }
  ];

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.toggleFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.toggleOrder() },
    { id: 'properties', iconClass: 'pi pi-tags', click: () => this.openPropertiesModal() },
  ];

  toggleSearchBar(): void {
    this.searchBarOpen = !this.searchBarOpen;
  }

  toggleFilter(): void {
    this.filterOpen = !this.filterOpen;
  }

  toggleOrder(): void {
    this.orderOpen = !this.orderOpen;
  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }

  onInputType(): void {

  }

  createTask(): void {
    let taskCreate: TaskCreate = {
      name: "Nova Tarefa",
      description: "Descreva um pouco sobre sua Tarefa Aqui",
      project: {
        id: 1
      },
      values: [],
      creator: {
        id: 1
      }
    }
    this.taskService.create(taskCreate).subscribe(
      (task) => {
        this.project.tasks.push(task);
        this.changeModalTaskState(true, task);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  taskOpenObject!: Task;
  changeModalTaskState(bool: boolean, task: Task): void{
    this.taskOpen = bool;
    if(this.taskOpen){
      this.taskOpenObject = task;
    } else{
      this.taskOpenObject = {} as Task;
    }
  }

  openPropertiesModal(): void {
    this.propertiesOpen = !this.propertiesOpen;
  }
}
