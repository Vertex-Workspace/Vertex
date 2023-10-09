import { Component } from '@angular/core';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {
  kanban: any[] = [
    {
      name: 'TO-DO',
      color: '#FFE7E9'
    },
    {
      name: 'DOING',
      color: '#FFF2AF'
    },
    {
      name: 'DONE',
      color: '#C7FFB4'
    }
  ];


}
