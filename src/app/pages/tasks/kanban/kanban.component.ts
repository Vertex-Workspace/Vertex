import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

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
      color: '#d7ffc971',
      borderColor: '#65D73C'
    },
    {
      name: 'OUTRA CATEGORIA',
      color: '#d7ffc971',
      borderColor: '#7be05780'
    },
    {
      name: 'ÚLTIMA CATEGORIA',
      color: '#d7ffc971',
      borderColor: '#7be05780'
    },
    // {
    //   name: 'DONE',
    //   color: '#D7FFC9',
    //   borderColor: '#7be0575d'
    // },
    // {
    //   name: 'DONE',
    //   color: '#D7FFC9',
    //   borderColor: '#7be0575d'
    // },
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
    },
    {
      name: 'Tarefa 10',
      category: this.categories[2]
    },
    {
      name: 'Tarefa 11',
      category: this.categories[2]
    },
    {
      name: 'Tarefa 12',
      category: this.categories[2]
    }
  ];


  specificCategoryArray(task: Task): any[] {
    return this.taskList.filter(taskFor => {
      return taskFor.category === task.category;
    });
  }

  dropCard(event: CdkDragDrop<Task[]>, category: any): void {  
    const task = event.item.data;
    task.category = category;

    const newIndexTask = 
            this.specificCategoryArray(task)[event.currentIndex];
    const newIndex = this.taskList.indexOf(newIndexTask);
    const previousIndex = this.taskList.indexOf(task);
    
    moveItemInArray(
      this.taskList, 
      previousIndex, 
      newIndex
    );
  };
}