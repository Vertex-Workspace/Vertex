import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {
  categories: any[] = [
    {
      name: 'TO-DO',
      color: '#FFE7E9',
      borderColor: '#FF9D9D'
    },
    {
      name: 'DOING',
      color: '#FFF6C5',
      borderColor: '#FFD600'
    },
    {
      name: 'DONE',
      color: '#D7FFC9',
      borderColor: '#65D73C'
    }
  ];

  taskList: Task[] = [
    {
      name: 'Tarefa 1',
      category: this.categories[0]
    },
    {
      name: 'Tarefa 2',
      category: this.categories[0]
    },
    {
      name: 'Tarefa 3',
      category: this.categories[0]
    },
    {
      name: 'Tarefa 4',
      category: this.categories[1]
    },
    {
      name: 'Tarefa 5',
      category: this.categories[1]
    },
    {
      name: 'Tarefa 6',
      category: this.categories[1]
    },
    {
      name: 'Tarefa 7',
      category: this.categories[2]
    },
    {
      name: 'Tarefa 8',
      category: this.categories[2]
    },
    {
      name: 'Tarefa 9',
      category: this.categories[2]
    }
  ]

  isLeft(task: Task): boolean {
    const newArray = 
      this.taskList.filter(taskFor => {
        return taskFor.category === task.category;
      });
    
    return newArray.indexOf(task) % 2 === 0;
  }


}
