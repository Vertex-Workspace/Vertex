import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  clicked: string = 'kanban';

  menuItems = ['kanban', 'lines', 'calendar', 'mural'];
  iconClasses: { [key: string]: string } = {
    'kanban': 'pi pi-th-large',
    'lines': 'pi pi-list',
    'calendar': 'pi pi-calendar',
    'mural': 'pi pi-chart-bar'
  };
}
