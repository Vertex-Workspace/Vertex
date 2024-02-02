import { Component, Input, OnInit } from '@angular/core';
import { Task, TaskCreate } from 'src/app/models/task';
import {  CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { PropertyKind } from 'src/app/models/property';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() project!: Project;

  cols: any[] = [];

  constructor(
    private userService: UserService, private taskService:TaskService
  ) {}

  ngOnInit(): void {
    //Define o primeiro campo da tabela como o nome
    this.cols.push( 
      {
        field: "name",
        headerText: "Nome",
        width: '40%',
      }  
    );

    this.project.properties.forEach( (property) => {
      let newCol: any = {
        id: property.id,
        field: property.kind,
        headerText: property.name,
        width: '300px',
      }
      this.cols.push(newCol);
    });
  }

  dropCard(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(
      this.project.tasks, 
      event.previousIndex, 
      event.currentIndex
    );
  }

}