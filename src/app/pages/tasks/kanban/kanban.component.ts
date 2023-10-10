import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
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

  properties: any[] = [
    {
      name: 'Categorias',
      values: [
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
      ]
    },
    {
      name: 'prop 1',
    }
  ];

  specificCategoryArray(task: Task): any[] {
    return this.taskList.filter(taskFor => {
      return taskFor.category === task.category;
    });
  }

  isLeft(task: Task): boolean {
    return this.specificCategoryArray(task).indexOf(task) % 2 === 0;
  }

  getCategories(): any[] {
    return this.categories.map(category => category.cdkDropList);
  }

  dropCard(event: CdkDragDrop<Task[]>, category: any): void {
    console.log(event);
  
    const task = event.item.data;
    task.category = category;
    const currentIndexTask = 
            this.specificCategoryArray(task)[event.currentIndex];
    const currentIndex = this.taskList.indexOf(currentIndexTask);
    const previousIndex = this.taskList.indexOf(task);
    
    moveItemInArray(
      this.taskList, 
      previousIndex, 
      currentIndex
    );
  }
}