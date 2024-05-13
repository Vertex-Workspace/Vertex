import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task, TaskCreate } from 'src/app/models/class/task';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Project } from 'src/app/models/class/project';
import { Property, PropertyKind, PropertyList, PropertyListKind } from 'src/app/models/class/property';
import { TaskService } from 'src/app/services/task.service';
import { Value, ValueCreatedWhenTaskCreated, ValueUpdate } from 'src/app/models/class/value';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { taskHourService } from 'src/app/services/taskHour.service';
import { ProjectService } from 'src/app/services/project.service';
import { PipeParams } from 'src/app/models/interface/params';
import { colors } from 'src/app/models/colors';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {


  constructor(
    private taskService: TaskService,
    private alertService: AlertService,
    private userService: UserService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private teamService: TeamService, private translate: TranslateService) {
  }

  @Input()
  project!: Project;

  @Input() canDeleteVerification?: boolean

  @Input() permissions!: Permission[];

  taskList !: Task[];

  canCreate: boolean = false;
  canEdit: boolean = false;

  @Input()
  nameFilter !: string;

  @Input()
  filter !: any;

  @Input()
  orderParams !: PipeParams;

  status : PropertyList[] = [];

  ngOnChanges(){
    if(this.lastIndexSize != this.project.tasks.length){
      this.status = this.project.properties[0].propertyLists;
      this.taskList = this.project.tasks;
    }
  }

  lastIndexSize: number = 0;
  ngOnInit() {
    this.lastIndexSize = this.project.tasks.length;
    this.taskList = this.project.tasks;
    this.status = this.project.properties[0].propertyLists;

    
    for (const permission of this.permissions) {
      if ((permission.name === PermissionsType.EDIT) && permission.enabled) {
        this.canEdit = true;
      } else if ((permission.name === PermissionsType.CREATE) && permission.enabled) {
        this.canCreate = true;
      }
    }
    
  }

  dropCard(event: CdkDragDrop<Task[]>, propertyList: PropertyList): void {
    if (this.canEdit) {
      const task: Task = event.item.data;

      let previousPropertyList!: PropertyList;
      let newValue!: Value;

      let previousList : Task[] = [];


      //For each to find the value of current and future property List
      this.project.properties.forEach((property) => {
        if (property.kind == PropertyKind.STATUS) {
          task.values.forEach((value) => {
            if (value.property.id == property.id) {
              //Save the old value
              previousPropertyList = value.value as PropertyList;
              previousList = this.specificPropertyArray(previousPropertyList);
              //Save the new value
              value.value = propertyList;
              
              //Save on a local variable the value of the task
              newValue = value;
            }
          });
        }
      });

      if(propertyList.id == previousPropertyList.id){
        const currentList : Task[] = this.specificPropertyArray(propertyList);    
        moveItemInArray(
          this.taskList, 
          this.taskList.indexOf(currentList[event.previousIndex]), 
          this.taskList.indexOf(currentList[event.currentIndex])
        );
      } else {
        const currentList : Task[] = this.specificPropertyArray(propertyList);      
        moveItemInArray(
          this.taskList, 
          this.taskList.indexOf(previousList[event.previousIndex]), 
          this.taskList.indexOf(currentList[event.currentIndex])
        );

      }

      //It points out that the previousValue is incorrect
      if (previousPropertyList == null) {
        return;
      }
    

      //If the value of status task is different of the previous value, then, the request is sent
      if (propertyList.id != previousPropertyList.id) {
        if(propertyList.propertyListKind === PropertyListKind.DONE){
          this.taskService.setTaskDependencyNull(task.id, task).subscribe((task: Task)=> {
            task = task;
          })
        }
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
          },
          userID: this.userService.getLogged().id!
        };
        //Patch the value of the status task
        this.taskService.patchValue(valueUpdate).subscribe(
          () => { },
          (error) => {
            newValue.value = previousPropertyList;
            this.alertService.errorAlert(error.error);
          }
        );
      }
    } else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.permission_to_edit_propertiesK"));
    }
  };


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
    this.taskList = this.taskList.filter(t => task.id !== t.id)
    this.project.tasks = this.project.tasks.filter(taskdaje => taskdaje.id !== task.id);
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

    if (propertyUsed == null) {
      return;
    }
    
    let taskCreate: TaskCreate = {
      name: this.translate.instant("pages.tasks.new_task"),
      description: this.translate.instant("pages.tasks.new_task_description"),
      project: {
        id: this.project.id!
      },
      values: [],
      creator: {
        id: this.userService.getLogged().id!
      },
      teamId: this.project.idTeam!
    }
    
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
          },
          userID: this.userService.getLogged().id!
        };

        this.taskService.patchValue(valueUpdate).subscribe(
          (taskDate) => {
            task.values = taskDate.values;
            this.taskList.unshift(task);
            this.alertService.successAlert(this.translate.instant("alerts.success.task_created"));
          },
          (error) => {
            console.error(error);
          }
        );

      },
      (error: any) => {
        this.alertService.errorAlert(this.translate.instant("alerts.error.task_not_created"));
      }
    );
  }
  getStrongerColor(colorReceived: string): string | undefined {
    const matchingColor = colors.find(color => color.weak === colorReceived);
    return matchingColor ? matchingColor.text : undefined;
  } 
}