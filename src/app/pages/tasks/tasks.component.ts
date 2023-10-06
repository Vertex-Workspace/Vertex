import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  filterSettings: any[] = [];
  orderSettings: any[] = [];
  clicked: string = 'kanban';
  searchBarOpen: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;

  menuItems = [
    { id: 'kanban', iconClass: 'pi pi-th-large', label: 'Kanban' },
    { id: 'list', iconClass: 'pi pi-list', label: 'Lista' },
    { id: 'calendar', iconClass: 'pi pi-calendar', label: 'Calendário' },
    { id: 'mural', iconClass: 'pi pi-chart-bar', label: 'Mural' }
  ];

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
  ];


  clickSearchBar(): void {
    this.searchBarOpen = !this.searchBarOpen;
  } 
  
  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
  }
  
  clickOrder(): void {
    this.orderOpen = !this.orderOpen;
  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }
}
