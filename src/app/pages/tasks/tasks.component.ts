import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  clicked: string = 'kanban';
  searchBarOpen: boolean = false;

  menuItems = [
    { id: 'kanban', iconClass: 'pi pi-th-large', label: 'Kanban' },
    { id: 'lines', iconClass: 'pi pi-list', label: 'Linhas' },
    { id: 'calendar', iconClass: 'pi pi-calendar', label: 'Calendário' },
    { id: 'mural', iconClass: 'pi pi-chart-bar', label: 'Mural' }
];

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: this.clickOrder() },
];

  clickSearchBar(): void {
    this.searchBarOpen = !this.searchBarOpen;
  } 

  clickFilter(): void {

  }

  clickOrder(): void {

  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }
}
