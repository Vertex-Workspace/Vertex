import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { taskList, 
         cols,
         homeCols  } from '../data-test';
import {  CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { PropertyKind } from 'src/app/models/property';

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

  @Input() project!: Project;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.project);
  }

  getCols(): any[] {
    if (this.router.url.includes('/tarefas')) {
      let cols : any[] = this.cols;
      this.project.properties.forEach( (property) => {
        let newCol: any = {
          field: property.kind,
          headerText: property.name,
          width: '15%',
        }
        cols.push(newCol);
      });
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
