import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { categories, taskList } from '../data-test';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {

  selectedCards ?: Task[];

  categories = categories;
  taskList = taskList;

  specificPropertyArray(property: any): any[] {
    return this.taskList.filter(task => {
      return task.category === property;
    });
  }

  dropCard(event: CdkDragDrop<Task[]>, category: any): void {  
    const task = event.item.data;
    task.category = category;

    const newIndexTask = 
            this.specificPropertyArray(task.category)[event.currentIndex];
    const newIndex = this.taskList.indexOf(newIndexTask);
    const previousIndex = this.taskList.indexOf(task);
    
    moveItemInArray(
      this.taskList, 
      previousIndex, 
      newIndex
    );
  };

  getHeight(property: any): string {
    const propertyTasksQtt = 
            this.specificPropertyArray(property).length;

    return ((propertyTasksQtt * 150) + 110) + "px";
  }


}