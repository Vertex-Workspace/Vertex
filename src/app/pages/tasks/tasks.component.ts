
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';
import { Task, TaskCreate } from 'src/app/models/task';
import { UserService } from 'src/app/services/user.service';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  filterSettings: any[] = [];
  orderSettings: any[] = [];
  clicked : string = 'Mural';
  query: string = '';
  searchBarOpen: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;
  propertiesOpen: boolean = false;
  taskOpen: boolean = false;
  logged !: User;

  project!: Project;

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private noteService: NoteService,
    private userService : UserService
  ) {
    this.logged = this.userService.getLogged();
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.projectService
      .getOneById(id)
      .subscribe((p: Project) => {
        this.project = p;
      })
  }

  ngOnInit(): void {

  }

  menuItems = [
    { id: 'Kanban', iconClass: 'pi pi-th-large', label: 'Kanban' },
    { id: 'List', iconClass: 'pi pi-list', label: 'Lista' },
    { id: 'Calendar', iconClass: 'pi pi-calendar', label: 'Calendário' },
    { id: 'Mural', iconClass: 'pi pi-chart-bar', label: 'Mural' }
  ];

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.toggleFilter(), onMural: false },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.toggleOrder(), onMural: false },
    { id: 'properties', iconClass: 'pi pi-tags', click: () => this.openPropertiesModal(), onMural: true },
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
    localStorage.setItem('mode-task-view', preview);
  }

  onInputType(): void {

  }

  createTask(): void {
    let taskCreate: TaskCreate = {
      name: "Nova Tarefa",
      description: "Descreva um pouco sobre sua Tarefa Aqui",
      project: {
        id: this.project.id!
      },
      values: [],
      creator: {
        id: this.userService.getLogged().id!
      },
      teamId: this.project.idTeam!
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

  createNote(): void {
    const note: Note = {
      title: 'Nova nota',
      description: '',
      width: 300,
      height: 300,
      color: 'WHITE',
      positionX: 20,
      positionY: 40,
    }

    this.noteService
      .create(note, this.logged.id!, this.project.id!)
      .subscribe();
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

  updateProjectByTaskChanges(event: any): void{
    let taskUpdated: Task = event;
    this.project.tasks = this.project.tasks.map(task => {
      if(task.id === taskUpdated.id){
        return taskUpdated;
      }
      return task;
    });
  }
  
}
