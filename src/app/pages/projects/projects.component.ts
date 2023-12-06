import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  isCreating: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;
  clicked: string = 'task';

  logged !: User;

  //TASKS - FILTER AND ORDER
  filterSettings: any[] = [];
  orderSettings: any[] = [];

  menuItems = [
    { id: 'task', iconClass: 'pi pi-list', label: 'Tarefas' },
    { id: 'project', iconClass: 'pi pi-users', label: 'Projetos' },
  ];

  constructor(
    private projectService: ProjectService
  ) {}

  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }

  switchCreateView():void{
    this.isCreating = !this.isCreating;
  }

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
  ];

  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
  }
  
  clickOrder(): void {
    this.orderOpen = !this.orderOpen;
  }

  createProject(project: Project): void {
    console.log(project);
    
  }

}
