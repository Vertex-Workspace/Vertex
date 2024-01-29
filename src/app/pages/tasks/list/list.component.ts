import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { taskList, 
         cols,
         homeCols  } from '../data-test';
import {  CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  protected taskList = taskList;
  protected cols = cols;
  protected homeCols = homeCols;
  faEllipsisVertical = faEllipsisVertical;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  getCols(): any {
    if (this.router.url === '/tarefas/lista') {
      return this.cols;
    }

    return this.homeCols;
  }

  dropCard(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(
      this.taskList, 
      event.previousIndex, 
      event.currentIndex
    );
  }

}
