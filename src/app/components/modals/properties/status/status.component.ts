import { Component, EventEmitter, Input, Output } from '@angular/core';
import {faArrowLeft, faPaintBrush, faTrashCan, faEllipsisVertical,
faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

    faArrowLeft = faArrowLeft;
    faPaintBrush = faPaintBrush;
    faTrashCan = faTrashCan;
    faEllipsisVertical = faEllipsisVertical;
    faPlus = faPlus;
    colorModal: boolean = false;
  
  @Output()
  close = new EventEmitter<Event>();

  @Output()
  pencil = new EventEmitter<String>();

  @Input()
  height?: String;

  @Input()
  width?: String;

  closeModal(){
    this.close.emit();
  }

  clickPencil(){
    this.pencil.emit();
  }

  statusList =[
    {
        name: 'Não iniciado',
        color:'#F7E2E4',
        properties: [
            {name: 'To do'}
        ]
    },
    {
        name:'A fazer',
        color: '#F5EFD2',
        properties: [
            {name: 'Doing'},
            {name: 'Para análise'},
        ]
    },
    {
        name:'Concluída',
        color:'#D9EED2',
        properties: [
            {name: 'Done'},
            {name: 'Arquivados'},
        ]
    }
  ]

  chooseColor(){
    this.colorModal = true;
  }

  add(item:number){
    this.statusList[item].properties.push({name: 'New Status'});
  }

  delete(item: number){
    this.statusList[item].properties.pop();
  }
}