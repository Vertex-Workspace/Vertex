import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Output() close = new EventEmitter();

  @Input() task!: Task;

  selectedComponent: string = 'description';

  // taskInput: any = {
  //   name: 'Nome da tarefa',
  //   team: 'Nome da equipe',
  //   comments: [
  //     {
  //       author: 'Marcos',
  //       comment: 'Comentário de número 1',
  //       date: '20/09/2018 - 14:55' //mudar
  //     },
  //     {
  //       author: 'Sérgio',
  //       comment: 'Comentário de número 2',
  //       date: '20/09/2018 - 14:55' //mudar
  //     }
  //   ],
  //   log: [
  //     {
  //       author: 'Marcos',
  //       action: 'adicionou uma propriedade',
  //       date: '20/09/2018 - 14:55' //mudar
  //     },
  //     {
  //       author: 'Sérgio',
  //       action: 'alterou a descrição',
  //       date: '20/09/2018 - 14:55' //mudar
  //     }
  //   ],
  //   properties: [ //mudar
  //     {
  //       name: 'Status',
  //       content: 'Doing',
  //     },
  //     {
  //       name: 'Responsável',
  //       content: 'Marcos'
  //     },
  //     {
  //       name: 'Prazo',
  //       content: '25/10/2023'
  //     }
  //   ]
  // }

  navigate(component: string): void {
    this.selectedComponent = component;
  }

  closeModal(): void {
    this.close.emit();
  }
}