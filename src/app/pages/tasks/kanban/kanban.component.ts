import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task, TaskCreate } from 'src/app/models/task';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { PropertyList } from 'src/app/models/property';
import { TaskService } from 'src/app/services/task.service';
import { ValueCreatedWhenTaskCreated, ValueUpdate } from 'src/app/models/value';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {


  constructor(private projectService: ProjectService, private taskService: TaskService, private alertService: AlertService) {

  }

  @Input()
  project!: Project;



  ngOnInit(): void {
    console.log(this.project);
  }

  dropCard(event: CdkDragDrop<Task[]>, propertyList: PropertyList): void {
    const task = event.item.data;
    const previousPropertyList: PropertyList = task.values[0].value as PropertyList;

    task.values[0].value = propertyList;

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
            id: task.values[0].property.id
          },
          value: {
            id: task.values[0].id,
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
    let taskCreate: TaskCreate = {
      name: "Nova Tarefa",
      description: "Descreva um pouco sobre sua Tarefa Aqui",
      project: {
        id: 1
      },
      values: [
        {
          property: {
            id: this.project.properties[0].id
          },
          value: {
            value: propertyList.id as number
          }
        }
      ],
      creator: {
        id: 1
      }
    }

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