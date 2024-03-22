
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectReview } from 'src/app/models/class/project';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';
import { Task, TaskCreate, TaskWaitingToReview } from 'src/app/models/class/task';
import { Permission, PermissionsType, User } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/class/note';
import { Observable } from 'rxjs';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Property, PropertyKind, PropertyListKind } from 'src/app/models/class/property';
import { ReviewService } from 'src/app/services/review.service';
import { PropertyList } from 'src/app/models/class/property';
import { ApproveStatus, ReviewCheck } from 'src/app/models/class/review';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  filterSettings: any[] = [];
  orderSettings: any[] = [];
  clicked: string = 'List';
  query: string = "";
  searchBarOpen: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;
  propertiesOpen: boolean = false;
  taskOpen: boolean = false;
  canCreate: boolean = false;
  isMuralPage !: boolean;
  openModalProject : boolean = false;
  project!: Project;
  renderProject!: Observable<Project> | undefined;
  permissions!: Permission[];
  tasksToReview: TaskWaitingToReview[] = [];
  badgeNumber: string = '0';
  taskReview: boolean = false;
  logged !: User;

  orderParams !: string;
  orderOptions : any = [
    { name: 'Nome', values: [
      { name: 'A-Z' },
      { name: 'Z-A' }
    ] }
  ]

  selectedStatusFilter !: any;
  filterOptions: any[] = [];

  pageTitle: string = 'Espaço de Trabalho';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService,
    private teamService: TeamService,
    private alertService: AlertService,
    private noteService: NoteService,
    private reviewService: ReviewService
  ) {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.projectId = id
    this.logged = userService.getLogged();
  }

  teamId?: number
  projectId!: number;

  ngOnChanges(changes: SimpleChanges) {
    
  }

  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.teamService.hasPermission(id, this.userService.getLogged()).subscribe((permissions: Permission[]) => {
      this.permissions = permissions;
      for (const permission of permissions) {
        if ((permission.name === PermissionsType.CREATE) && permission.enabled === true) {
          this.canCreate = true;
        }
      }
    });

    //Observable que é aguardado para renderizar os componentes filhos
    this.renderProject = this.projectService.getOneById(id);
    
    //Método que atribui o valor de project vindo do observable
    this.renderProject.forEach((p: Project) => {      
      this.project = p;
      this.setFilters(p);
      this.pageTitle = this.project.name;
      const currentView = localStorage.getItem('mode-task-view');
      if(currentView){
        this.clicked = currentView;
      }

      //Se o projeto possuir a opção de revisão, então é feita a requisição das tarefas que estão aguardando revisão
      if(this.project.projectReviewENUM !== ProjectReview.EMPTY){
        this.taskService.getTasksToReview(this.logged.id!, id).subscribe(
          (tasks : TaskWaitingToReview[]) => {            
            this.tasksToReview = tasks;
            this.badgeNumber = this.tasksToReview.length.toString();
          }
          );
      }
        
    });
  }

  setFilters(p: Project): void {
    p.properties.forEach((prop: Property, index: number) => {
      this.filterOptions.push({
        name: prop.name,
        values: []
      })

      if (prop.kind === PropertyKind.STATUS 
            || prop.kind === PropertyKind.LIST) {
        
        prop.propertyLists
          .forEach((pl: PropertyList) => {
                this.filterOptions[index].values.push({
                  name: pl.value,
                  kind: pl.propertyListKind,
                  index: p.properties.indexOf(prop)
                })
              })
      } else {
        this.filterOptions[index]
          .values.push({
            name: prop.kind as string,
            index: p.properties.indexOf(prop),
            propName: prop.name
          })
      }
    })
    
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
    // { id: 'properties', iconClass: 'pi pi-tags', click: () => this.openPropertiesModal() },
  ];

  toggleSearchBar(): void {
    this.searchBarOpen = !this.searchBarOpen;
  }

  toggleFilter(): void {
    this.filterOpen = !this.filterOpen;
    this.selectedStatusFilter = '';
  }

  toggleOrder(): void {
    this.orderOpen = !this.orderOpen;
    this.orderParams = '';
  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
    if (this.clicked === 'Mural') this.isMuralPage = true;
    else this.isMuralPage = false;
    localStorage.setItem('mode-task-view', preview);
  }

  onInputType(): void {

  }

  createTask(): void {
    const taskCreate: TaskCreate = {
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

  updateTasksToReview(tasks : TaskWaitingToReview[]) {
    this.tasksToReview = tasks;
    this.badgeNumber = this.tasksToReview.length.toString();
    this.toggleReview();
  }

  createNote(): void {
    const note: Note = {
      title: 'Nova nota',
      description: '',
      width: 300,
      height: 300,
      color: 'WHITE',
      posX: 20,
      posY: 40,
      files: []
    }

    this.noteService
      .create(note, this.logged.id!, this.project.id!)
      .subscribe((note: Note) => {
        this.project.notes.push(note);
      });
  }

  taskOpenObject!: Task;
  changeModalTaskState(bool: boolean, task: Task): void {
    this.taskOpen = bool;
    if (this.taskOpen) {
      this.taskOpenObject = task;
    } else {
      this.taskOpenObject = {} as Task;
    }
  }

  openPropertiesModal(): void {
    this.propertiesOpen = !this.propertiesOpen;
  }

  updateProjectByTaskChanges(event: any): void{
    const taskUpdated: Task = event;
    this.project.tasks = this.project.tasks.map(task => {
      if (task.id === taskUpdated.id) {
        return taskUpdated;
      }
      return task;
    });
  }

  changeProject(project: Project) {
    this.project = project;
  }

  getProject(): Project {
    return this.project;
  }

  //MODAL REVIEW TASK
  toggleReview():void{
    this.taskReview = !this.taskReview;
  }
  openProjectInfos(){
    this.openModalProject = !this.openModalProject;
  }

}