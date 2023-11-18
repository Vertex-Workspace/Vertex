import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  filterSettings: any[] = [];
  orderSettings: any[] = [];
  clicked: string = 'kanban';
  query: string = '';
  searchBarOpen: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;
  propertiesOpen: boolean = false;

  menuItems = [
    { id: 'kanban', iconClass: 'pi pi-th-large', label: 'Kanban' },
    { id: 'list', iconClass: 'pi pi-list', label: 'Lista' },
    { id: 'calendar', iconClass: 'pi pi-calendar', label: 'Calendário' },
    { id: 'mural', iconClass: 'pi pi-chart-bar', label: 'Mural' }
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
    this.propertiesOpen = true;
  }
}
