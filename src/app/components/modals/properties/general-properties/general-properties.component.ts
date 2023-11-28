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
      status: 'Visíveis',
      icon: faEye,
      properties: [
        { name: 'Nome da Tarefa', icon: faFont },
        { name: 'Prazo', icon: faCalendarDays },
      ]
    },
    {
      status: 'Não visíveis',
      icon: faEyeSlash,
      properties: [
        { name: 'Status', icon: faSpinner },
        { name: 'Itens Seleção', icon: faCaretDown }
      ]
    },
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
      this.edit.emit({ list: this.propertiesList[i].properties[i2].name });
    }
  }


  changeStatus(namep: string, icon: any, i: number, i2: number) {
    let visibles: any = this.propertiesList[0].properties;
    let invisibles: any = this.propertiesList[1].properties;

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

  // In this method, it verifies if the index of the list is 1 or 0 to change the position in the correct
  drop(event: CdkDragDrop<any[]>, i: number) {
    if ((event.previousContainer === event.container) && i == 0) {
      moveItemInArray(this.propertiesList[0].properties, event.previousIndex, event.currentIndex);
    } else if ((event.previousContainer === event.container) && i == 1) {
      moveItemInArray(this.propertiesList[1].properties, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}

