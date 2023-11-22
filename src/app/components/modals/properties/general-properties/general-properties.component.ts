import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faArrowLeft, faXmark, faEye, faGear,
  faTrashCan, faEyeSlash, faEllipsisVertical,
  faFont, faCalendarDays, faPlus, faSpinner, faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-general-properties',
  templateUrl: './general-properties.component.html',
  styleUrls: ['./general-properties.component.scss']
})
export class GeneralPropertiesComponent{

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

  @Input() propertiesList: any[] = [];

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

  clickGear(type: string, i: number) {
      this.gear.emit({list: this.propertiesList[i].name});
      console.log(this.propertiesList[i].name)
  }

  clickPlus(type: string) {
    this.plus.emit();
  }

  editProperty(i: number) {
    if (this.propertiesList[i].icon2 === faSpinner) {
      this.status.emit();
    } else if (this.propertiesList[i].icon2 === faCaretDown) {
      this.select.emit();
    } else {
      this.edit.emit({list: this.propertiesList[i].name});
    }
  }


  changeStatus(i: number) {
    if (this.propertiesList[i].status === 'visible') {
      this.propertiesList[i].status = 'invisible';
      this.propertiesList[i].icon = faEyeSlash;
    } else {
      this.propertiesList[i].status = 'visible';
      this.propertiesList[i].icon = faEye;
    }
  }

  openModals(modal: string) {
    if (modal === 'add') {
      this.currentModal = 'add';
    } else if (modal === 'status') {
      this.currentModal = 'status';
      this.generalModal = false;
    }
    console.log(this.generalModal);
  }

  delete(i: number) {
    this.propertiesList.splice(i, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.propertiesList, event.previousIndex, event.currentIndex);
  }


}

