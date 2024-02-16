import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task, TaskCreate } from 'src/app/models/task';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { Property, PropertyKind, PropertyList } from 'src/app/models/property';
import { TaskService } from 'src/app/services/task.service';
import { Value, ValueCreatedWhenTaskCreated, ValueUpdate } from 'src/app/models/value';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { HasPermission, Permission, PermissionsType, User } from 'src/app/models/user';
import { Team } from 'src/app/models/team';

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
    private teamService: TeamService) {

  }

  @Input()
  project!: Project;

  canCreate: boolean = false;

  dropCard(event: CdkDragDrop<Task[]>, propertyList: PropertyList): void {
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
            console.log(newValue);
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


  //Temporary
  getColor(color: string) {
    if (color === "RED") {
      return "#FF9D9D50";
    } else if (color === "YELLOW") {
      return "#FFD60035";
    } else if (color === "GREEN") {
      return "#65D73C50";
    } else {
      return "#7be05750";
    }
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
    this.hasPermission(this.userService.getLogged(), this.project)
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
      name: "Nova Tarefa",
      description: "Descreva um pouco sobre sua Tarefa Aqui",
      project: {
        id: 1
      },
      values: [
        {
          property: {
            id: propertyUsed.id
          },
          value: {
            value: propertyList.id as number
          }
        }
      ],
      creator: {
        id: this.userService.getLogged().id!
      },
      teamId: this.project.idTeam!
    }

    if (this.canCreate) {
      this.taskService.create(taskCreate).subscribe(
        (task: Task) => {
          this.project.tasks.push(task);
          this.alertService.successAlert("Tarefa criada com sucesso!");
        },
        (error: any) => {
          this.alertService.errorAlert("Erro ao criar tarefa!");
        }
      );
    }
  }

  hasPermission(user: User, project: Project): void {

    this.teamService.hasPermission(project, user).subscribe((permissions: Permission[]) => {
      user.permissions = permissions
      console.log(user.permissions);

      for (let i = 0; i < permissions.length; i++) {
        if ((permissions[i].name === PermissionsType.CREATE) && permissions[i].enabled === true) {
          this.canCreate = true
        }
      }
    })
  }


}