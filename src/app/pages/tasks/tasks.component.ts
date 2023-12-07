import { Component, Input, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';


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

  project!: Project;
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.clicked = this.getClicked();

    this.projectService.getOneById(1).subscribe((project: Project) => {
      this.project = project;
    });
  }

  getClicked(): string {
    return "/" + this.router.url.split('/')[1] + "/" + this.router.url.split('/')[2];
  }

  menuItems = [
    { id: '/tarefas/kanban', iconClass: 'pi pi-th-large', label: 'Kanban' },
    { id: '/tarefas/lista', iconClass: 'pi pi-list', label: 'Lista' },
    { id: '/tarefas/calendario', iconClass: 'pi pi-calendar', label: 'Calendário' },
    { id: '/tarefas/mural', iconClass: 'pi pi-chart-bar', label: 'Mural' }
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

  openPropertiesModal(): void {
    this.propertiesOpen = !this.propertiesOpen;
    console.log(this.propertiesOpen)
  }
}
