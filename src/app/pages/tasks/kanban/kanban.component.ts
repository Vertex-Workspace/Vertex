import { Component, ViewChild, ViewChildren } from '@angular/core';
import { Task } from 'src/app/models/task';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {


  // @ViewChildren('card') cards!: any[];
  // ngAfterViewInit() {
  //   this.cards.forEach(card => {
  //     console.log(card.nativeElement.offsetHeight);
  //   });
  // }
  selectedCards ?: Task[];

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
    {
      name: 'Tarefa 1',
      category: this.categories[0]
    },
    {
      name: 'Tarefa 2 Tarefa 2Tarefa 2Tarefa 2Tarefa 2Tarefa 2Tarefa 2',
      category: this.categories[0]
    },
    {
      name: 'REALIZAR PROCESSO BACK-END À PELÉ REALIZAR PROCESSO BACK-END À PELÉ REALIZAR PROCESSO BACK-END À PELÉ REALIZAR PROCESSO BACK-END À PELÉ',
      category: this.categories[0]
    },
    {
      name: 'Tarefa 4',
      category: this.categories[1]
    },
    {
      name: 'Tarefa 5',
      category: this.categories[1]
    },
    {
      name: 'Tarefa 6',
      category: this.categories[1]
    },
    {
      name: 'Tarefa 7',
      category: this.categories[2]
    }
  ];

  specificPropertyArray(property: any): any[] {
    return this.taskList.filter(task => {
      return task.category === property;
    });
  }

  dropCard(event: CdkDragDrop<Task[]>, category: any): void {  
    const task = event.item.data;
    task.category = category;

    const newIndexTask = 
            this.specificPropertyArray(task.category)[event.currentIndex];
    const newIndex = this.taskList.indexOf(newIndexTask);
    const previousIndex = this.taskList.indexOf(task);
    
    moveItemInArray(
      this.taskList, 
      previousIndex, 
      newIndex
    );
  };

  getHeight(property: any): string {
    return ((this.specificPropertyArray(property).length * 174) + 70) + "px";
  }



}