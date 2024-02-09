import { Component, Input, OnInit } from '@angular/core';
import { Task, TaskCreate } from 'src/app/models/task';
import {  CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Property, PropertyKind, PropertyList } from 'src/app/models/property';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  project !: Project;

  @Input()
  team ?: Team;

  cols: any[] = [];

  taskList: Task[] = [];

  logged !: User;

  isNull : boolean = true;

  constructor(
    private userService: UserService, 
    private taskService: TaskService,
    private route: ActivatedRoute,
  ) {
    this.logged = userService.getLogged();
  }

  ngOnInit(): void {    
    //Define o primeiro campo da tabela como o nome
    this.cols.push( 
      {
        field: "name",
        headerText: "Nome",
        width: '300px',
      }  
    );     

    if (this.project) this.getProject();
    else if (this.team) this.getTeam();
    else this.getAllTasks();      

  }
  
  ngOnDestroy(): void {
    this.taskList = [];
  }

  dropCard(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(
      this.taskList, 
      event.previousIndex, 
      event.currentIndex
    );
  }

  getTeam(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService
      .getAllByTeam(id)
      .subscribe((tl: Task[]) => {
        this.taskList = tl;
        this.getStatusAndNameCols(tl);
      });
  }

  getProject(): void {
    this.isNull = false;  
    this.taskList = this.project.tasks;
  }

  getAllTasks(): void {
    this.taskService
      .getAllByUser(this.logged.id!)
      .subscribe((tl: Task[]) => {
        this.taskList = tl;
        this.getStatusAndNameCols(tl);
      })
  }

  getAllCols(): void {
    if (this.project) {

      this.project.properties.forEach((property) => {
        const newCol: any = {
          id: property.id,
          field: property.kind,
          headerText: property.name,
          width: '300px',
        }
        this.cols.push(newCol);
      });
    } 
  }

  getStatusAndNameCols(tl: Task[]): void {
      const property: Property = tl[0].values[0].property;
      const newCol: any = {
        id: property.id,
        field: property.kind,
        headerText: property.name,
        width: '300px'
      };
      this.cols.push(newCol);
      
  }

}