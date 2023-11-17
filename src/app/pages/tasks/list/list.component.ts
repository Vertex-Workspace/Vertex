import { Component, HostListener, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { 
  taskList, 
  cols
} from '../data-test';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  protected taskList = taskList;
  protected cols = cols;

  ngOnInit(): void {
  }

  dropCard(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(
      this.taskList, 
      event.previousIndex, 
      event.currentIndex
    );
  }

}
