import { Component, EventEmitter, Input, Output } from '@angular/core';
import {faArrowLeft, faPaintBrush, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

    faArrowLeft = faArrowLeft;
    faPaintBrush = faPaintBrush;
    faTrashCan = faTrashCan;
  
  @Output()
  close = new EventEmitter<Event>();

  @Input()
  height?: String;

  @Input()
  width?: String;

  closeModal(){
    this.close.emit();
  }

  statusList =[
    {
        name: 'Não iniciado',
        properties: [
            {name: 'To do'}
        ]
    },
    {
        name:'A fazer',
        properties: [
            {name: 'Doing'},
            {name: 'Para análise'},
        ]
    },
    {
        name:'Concluída',
        properties: [
            {name: 'Done'},
            {name: 'Arquivados'},
        ]
    }
  ]


}