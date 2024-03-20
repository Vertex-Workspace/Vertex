import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task, TaskCreate } from 'src/app/models/class/task';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Project } from 'src/app/models/class/project';
import { Property, PropertyKind, PropertyList } from 'src/app/models/class/property';
import { TaskService } from 'src/app/services/task.service';
import { Value, ValueCreatedWhenTaskCreated, ValueUpdate } from 'src/app/models/class/value';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { taskHourService } from 'src/app/services/taskHour.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {


  constructor(
    private taskService: TaskService, 
    private alertService: AlertService,
    private userService : UserService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private teamService: TeamService) {
  }

  @Input()
  project!: Project;

  @Input() canDeleteVerification ?: boolean

  @Input() permissions!: Permission[]; 

  taskList !: Task[];

  canCreate: boolean = false;
  canEdit: boolean = false;

  @Input()
  nameFilter !: string;

  @Input()
  statusFilter !: string;

  ngOnInit(){
    this.taskList = this.project.tasks;
    
    for (const permission of this.permissions) {
      if ((permission.name === PermissionsType.EDIT) && permission.enabled) {
        this.canEdit = true;
      }else if ((permission.name === PermissionsType.CREATE) && permission.enabled) {
        this.canCreate = true;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  dropCard(event: CdkDragDrop<Task[]>, propertyList: PropertyList): void {
    if(this.canEdit){
    const task: Task = event.item.data;

    let previousPropertyList!: PropertyList;
    let newValue!: Value;

    //For each to find the value of current and future property List
    this.project.properties.forEach((property) => {
      if (property.kind == PropertyKind.STATUS) {
        task.values.forEach((value) => {
          if (value.property.id == property.id) {
            //Save the old value
            previousPropertyList = value.value as PropertyList;

            //Save the new value
            value.value = propertyList;

            //Save on a local variable the value of the task
            newValue = value;
          }
        });
      }
    });

    //It points out that the previousValue is incorrect
    if (previousPropertyList == null) {
      return;
    }

    const newIndexTask =
    this.specificPropertyArray(propertyList)[event.currentIndex];
    const newIndex = this.project.tasks.indexOf(newIndexTask);
    const previousIndex = this.project.tasks.indexOf(task);


    moveItemInArray(
      this.project.tasks,
      previousIndex,
      newIndex
    );


    //If the value of status task is different of the previous value, then, the request is sent
    if (propertyList.id != previousPropertyList.id) {
      //Object to change the value of the status task
      const valueUpdate: ValueUpdate = {
        id: task.id,
        value: {
          property: {
            id: newValue.property.id
          },
          value: {
            id: newValue.id,
            value: propertyList.id
          }
        }
      };
      //Patch the value of the status task
      this.taskService.patchValue(valueUpdate).subscribe();
    }
  }else {
    this.alertService.errorAlert("Você não tem permissão para alterar o status da tarefa!")
  }
  };

  getHeight(propertyList: PropertyList): string {
    return ((this.specificPropertyArray(propertyList).length * 174) + 70) + "px";
  }

  specificPropertyArray(propertyList: PropertyList): Task[] {
    return this.project.tasks.filter(task => {
      let valueIntoPropertyList: PropertyList = task.values[0].value as PropertyList;
      return valueIntoPropertyList.id == propertyList.id;
    });
  }


  getTaskByProperty(task: Task, propertyList: PropertyList): boolean {
    let valueIntoPropertyList: PropertyList = task.values[0].value as PropertyList;
    return valueIntoPropertyList.id == propertyList.id;
  }


  deleteTask(task: Task): void {
    this.project.tasks = this.project.tasks.filter(taskdaje => taskdaje.id != task.id);
  }

  @Output() openTaskDetails = new EventEmitter();
  openTaskModal(task: Task): void {
    this.openTaskDetails.emit(task);
  }

  createTask(propertyList: PropertyList) {
    let propertyUsed!: Property;
    //For each to find the property of the clicked Property List
    this.project.properties.forEach((property) => {

      if (property.kind == PropertyKind.STATUS) {

        property.propertyLists.forEach((propertyListForEach) => {

          if (propertyListForEach.id == propertyList.id) {
            propertyUsed = property;
          }
        });
      }
    });

    if(propertyUsed == null){
      return;
    }

    let taskCreate: TaskCreate = {
      name: "Nova Tarefa",
      description: "Descreva um pouco sobre sua Tarefa Aqui",
      project: {
        id: this.project.id!
      },
      values: [],
      creator: {
        id: this.userService.getLogged().id!
      },
      teamId: this.project.idTeam!
    }
    console.log("Task", taskCreate);
    
    this.taskService.create(taskCreate).subscribe(
      (task: Task) => {

        const valueUpdate: ValueUpdate = {
          id: task.id,
          value: {
            property: {
              id: propertyUsed.id
            },
            value: {
              //It always gonna be the status
              id: task.values[0].id,
              value: propertyList.id as number
            }
          }
        };
        console.log(valueUpdate);
        this.taskService.patchValue(valueUpdate).subscribe(
          (taskDate) => {
            task.values = taskDate.values;
            this.project.tasks.push(task);
            this.alertService.successAlert("Tarefa criada com sucesso!");
          },
          (error) => {
            console.log(error);
          }
        );

      },
      (error: any) => {
        this.alertService.errorAlert("Erro ao criar tarefa!");
      }
    );
    } 
}