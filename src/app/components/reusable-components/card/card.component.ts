import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  
  card: Task = {
    name: 'Tarefa 1'
  };

}
