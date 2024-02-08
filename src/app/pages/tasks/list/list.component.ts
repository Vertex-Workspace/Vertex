import { Component, Input, OnInit } from '@angular/core';
import { Task, TaskCreate } from 'src/app/models/task';
import {  CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { PropertyKind, PropertyList } from 'src/app/models/property';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

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

  constructor(
    private userService: UserService, 
    private taskService: TaskService,
    private projectService: ProjectService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {              
    if (this.project) this.getProject();
    else if (this.team) this.getTeam();
    else this.getAllTasks();

    this.getCols();  
  }

  getCols(): void {
    //Define o primeiro campo da tabela como o nome
    this.cols.push( 
      {
        field: "name",
        headerText: "Nome",
        width: '40%',
      }  
    );

    if (this.project) {
      console.log('a');
      

      this.project.properties.forEach((property) => {
        const newCol: any = {
          id: property.id,
          field: property.kind,
          headerText: property.name,
          width: '300px',
        }
        this.cols.push(newCol);
      });
    } else {
      this.taskList.forEach(t => {
        console.log(t);
        
      })      
      
    }
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
        tl.forEach((t: Task) => {
          this.taskList.push(t);
        }) 
      })
  }

  getProject(): void {
    this.taskList = this.project.tasks;
  }

  getAllTasks(): void {
    
  }

}