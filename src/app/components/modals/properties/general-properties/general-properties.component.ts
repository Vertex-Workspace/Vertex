import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faArrowLeft, faXmark, faEye, faGear,
  faTrashCan, faEyeSlash, faEllipsisVertical,
  faFont, faCalendarDays, faPlus, faSpinner, faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, CdkDropList, moveItemInArray, CdkDrag, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-general-properties',
  templateUrl: './general-properties.component.html',
  styleUrls: ['./general-properties.component.scss']
})
export class GeneralPropertiesComponent {

  faArrowLeft = faArrowLeft;
  faXmark = faXmark;
  faEye = faEye;
  faGear = faGear;
  faTrashCan = faTrashCan;
  faEyeSlash = faEyeSlash;
  faEllipsisVertical = faEllipsisVertical;
  faFont = faFont;
  faCalendarDays = faCalendarDays;
  faPlus = faPlus;
  faSpinner = faSpinner;
  currentModal: string = 'general';
  generalModal: boolean = true;

  @Output()
  close = new EventEmitter();

  @Input()
  height?: String;

  @Input()
  width?: String;

  @Output()
  gear = new EventEmitter();

  @Output()
  plus = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  @Output()
  select = new EventEmitter();

  @Output()
  status = new EventEmitter();

  closeModal() {
    this.close.emit();
  }

  propertiesList: any[] = [
    {
      status: 'Fixas',
      opacity: false,
      icon: faEye,
      properties: [
        { name: 'Prazo', icon: faCalendarDays },
        { name: 'Status', icon: faSpinner },
      ]
    },
    {
      status: 'Visíveis',
      opacity: false,
      icon: faEye,
      properties: [
        { name: 'Nome da Tarefa', icon: faFont },
      ]
    },
    {
      status: 'Não visíveis',
      opacity: true,
      icon: faEyeSlash,
      properties: [
        { name: 'Itens Seleção', icon: faCaretDown }
      ]
    }
  ]

  clickGear(type: string, i: number, i2: number) {
    this.gear.emit({ list: this.propertiesList[i].properties[i2].name });
    console.log(this.propertiesList[i].properties[i2].name)
  }

  clickPlus(type: string) {
    this.plus.emit();
  }

  editProperty(i: number, i2: number) {
    if (this.propertiesList[i].properties[i2].icon === faSpinner) {
      this.status.emit();
    } else if (this.propertiesList[i].properties[i2].icon === faCaretDown) {
      this.select.emit();
    } else {
      if(this.propertiesList[i].properties[i2].icon != faCalendarDays){
      this.edit.emit({ list: this.propertiesList[i].properties[i2].name });
      }
    }
  }


  changeStatus(namep: string, icon: any, i: number, i2: number) {
    let visibles: any = this.propertiesList[1].properties; 
    let invisibles: any = this.propertiesList[2].properties;
    if (this.propertiesList[i].icon === faEye) {

      invisibles.push({ name: namep, icon: icon });
      visibles.splice(i2, 1);

    } else {
      visibles.push({ name: namep, icon: icon });
      invisibles.splice(i2, 1);
    }
  }

  delete(i: number, i2: number) {
    console.log(i2);
    this.propertiesList[i].properties.splice(i2, 1);
  }

  // the number of fixed itens list is 0, so the user can't move the other itens into it
  drop(event: CdkDragDrop<any[]>, i: number) {
    if(i != 0){
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  } 
}

