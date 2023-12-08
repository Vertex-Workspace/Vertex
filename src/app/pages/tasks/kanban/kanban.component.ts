import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Task } from 'src/app/models/task';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { categories, taskList } from '../data-test';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { Property, PropertyKind, PropertyList, PropertyListKind } from 'src/app/models/property';
import { TaskService } from 'src/app/services/task.service';
import { ValueUpdate } from 'src/app/models/value';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {


  constructor(private projectService: ProjectService, private taskService: TaskService) {

  }

  project!: Project;
  properties: PropertyList[] = [];

  ngOnInit(): void {

    this.projectService.getOneById(1).subscribe((project: Project) => {
      this.project = project;
      console.log(project);
      project.properties[0].propertyLists.forEach((propertyList) => {
        this.properties.push(propertyList)
      });
    });


  }



  categories: any[] = [
    {
      name: 'TO-DO',
      color: '#FFE7E94D',
      borderColor: '#FF9D9Df3'
    },
    {
      name: 'DOING',
      color: '#FFF6C54D',
      borderColor: '#FFD600f3'
    },
    {
      name: 'DONE',
      color: '#d7ffc94D',
      borderColor: '#7be057de'
    },
    {
      name: 'OUTRA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#7be057de'
    },
    {
      name: 'ÚLTIMA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#7be057de'
    },
    {
      name: 'ÚLTIMA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#7be057de'
    },
    {
      name: 'ÚLTIMA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#7be057de'
    },
    {
      name: 'ÚLTIMA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#7be057de'
    },
    {
      name: 'ÚLTIMA CATEGORIA',
      color: '#d7ffc94D',
      borderColor: '#7be057de'
    }
  ];

  //ADICIONAR "80" NO FINAL DO HEXADECIMAL DA COLOR -> 50% OPACIDADE
  //ADICIONAR "DE" NO FINAL DO HEXADECIMAL DA BORDA -> 80%+-

  taskList: Task[] = [
    // {
    //   name: 'Tarefa 1',
    //   category: this.categories[0]
    // },
    // {
    //   name: 'Tarefa 2 Tarefa 2Tarefa 2Tarefa 2Tarefa 2Tarefa 2Tarefa 2',
    //   category: this.categories[0]
    // },
    // {
    //   name: 'REALIZAR PROCESSO BACK-END À PELÉ REALIZAR PROCESSO BACK-END À PELÉ REALIZAR PROCESSO BACK-END À PELÉ REALIZAR PROCESSO BACK-END À PELÉ',
    //   category: this.categories[0]
    // },
    // {
    //   name: 'Tarefa 4',
    //   category: this.categories[1]
    // },
    // {
    //   name: 'Tarefa 5',
    //   category: this.categories[1]
    // },
    // {
    //   name: 'Tarefa 6',
    //   category: this.categories[1]
    // },
    // {
    //   name: 'Tarefa 7',
    //   category: this.categories[2]
    // }
  ];



  dropCard(event: CdkDragDrop<Task[]>, propertyList: PropertyList): void {
    const task = event.item.data;
    const previousPropertyList : PropertyList = task.values[0].value as PropertyList;

    task.values[0].value = propertyList;

    const newIndexTask =
      this.specificPropertyArray(propertyList)[event.currentIndex];
    const newIndex = this.project.tasks.indexOf(newIndexTask);
    const previousIndex = this.project.tasks.indexOf(task);


    moveItemInArray(
      this.taskList,
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
      this.taskService.patchValue(valueUpdate).subscribe((taskdaje: Task) => {
        console.log(taskdaje);
      });
    }
  };

  getHeight(propertyList: PropertyList): string {
    return ((this.specificPropertyArray(propertyList).length * 174) + 70) + "px";
  }

  specificPropertyArray(propertyList: PropertyList): Task[] {
    return this.project.tasks.filter(task => {
      let valueIntoPropertyList: PropertyList = task.values[0].value as PropertyList;
      return valueIntoPropertyList.value == propertyList.value;
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
    return valueIntoPropertyList.value == propertyList.value;
  }


  deleteTask(task: Task): void {
    this.project.tasks = this.project.tasks.filter(taskdaje => taskdaje.id != task.id);
  }


}