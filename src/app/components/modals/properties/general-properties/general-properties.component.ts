import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faArrowLeft, faXmark, faEye, faGear,
  faTrashCan, faEyeSlash, faEllipsisVertical,
  faFont, faCalendarDays, faPlus, faSpinner
} from '@fortawesome/free-solid-svg-icons';

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
  close = new EventEmitter<Event>();

  @Input()
  height?: String;

  @Input()
  width?: String;

  @Output()
   gear = new EventEmitter<String>();

  @Output()
   plus = new EventEmitter<String>();

   @Output()
   edit = new EventEmitter<String>();

  closeModal() {
    this.close.emit();
  }

  clickGear(type: string) {
    this.gear.emit(type);
    console.log(type);
  }

  clickPlus(type: string) {
    this.plus.emit(type);
  }

  propertiesList = [
    { name: 'Nome da Tarefa', status: 'visible', icon: faEye, icon2: faFont },
    { name: 'Prazo', status: 'visible', icon: faEye, icon2: faCalendarDays },
    { name: 'Status', status: 'invisible', icon: faEyeSlash, icon2: faSpinner }
  ]


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

  editProperty(type: string){
    this.edit.emit(type);
  }
}

