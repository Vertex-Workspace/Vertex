import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
    colorModal: boolean = false

  @Output()
  pencil = new EventEmitter<String>();

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

  add(item:number){
    this.statusList[item].properties.push({name: 'New Status'});
  }

  delete(item: number, i2:number){
    this.statusList[item].properties.splice(i2,1);
  }

  drop(event: CdkDragDrop<any[]>, i: number) {
    if ((event.previousContainer === event.container) && i==0) {
      moveItemInArray(this.statusList[0].properties, event.previousIndex, event.currentIndex);
    }else if((event.previousContainer === event.container) && i==1){
      moveItemInArray(this.statusList[1].properties, event.previousIndex, event.currentIndex);
    }else if((event.previousContainer === event.container) && i==2){
      moveItemInArray(this.statusList[2].properties, event.previousIndex, event.currentIndex);
    }else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}