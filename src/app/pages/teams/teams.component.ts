import { Component } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent{

  isCreating: boolean = false;
  clicked: string = 'task';
  menuItems = [
    { id: 'task', iconClass: 'pi pi-list', label: 'Tarefas' },
    { id: 'team', iconClass: 'pi pi-users', label: 'Equipes' },
  ];


  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }

  switchCreateView():void{
    this.isCreating = !this.isCreating;
  }


  //TASKS - FILTER AND ORDER
  filterSettings: any[] = [];
  orderSettings: any[] = [];

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
  ];

  filterOpen: boolean = false;
  orderOpen: boolean = false;

  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
  }
  
  clickOrder(): void {
    this.orderOpen = !this.orderOpen;
  }

}
