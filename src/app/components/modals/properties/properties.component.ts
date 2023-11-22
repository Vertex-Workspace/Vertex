import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeft, faXmark, faPlus, faTrashCan, faEye, faEyeSlash,
faFont, faCalendarDays, faSpinner, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { elements } from 'chart.js';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent{

  faArrowLeft = faArrowLeft;
  faXmark = faXmark;
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faFont = faFont;
  faCalendarDays = faCalendarDays;
  faSpinner = faSpinner;
  faCaretDown = faCaretDown;
  currentModal: string = 'general';
  generalModal: boolean = true;
  text ?:string;
  propertiesType: any;

  @Output()
  close = new EventEmitter<Event>();

  @Input()
  height?: String;

  @Input()
  width?: String;

  closeModal() {
    this.close.emit();
  }

  name?: string;

  itemsList = [
    { name: 'Renda Fixa', status: 'visible', icon: faEye },
    { name: 'FII', status: 'visible', icon: faEye },
    { name: 'Renda variável', status: 'invisible', icon: faEyeSlash }
]

  clickGear(type: string) {
    if (type === 'gear') {
      this.currentModal = 'edit'
    } else if (type === 'plus') {
      this.currentModal = 'edit'
      this.name = 'Nova Propriedade'
    } else if (type === 'pencil') {
      this.currentModal = 'colors'
    } else if (type === 'edit') {
      this.currentModal = 'edit'
    } else if (type === 'items-selection') {
      this.currentModal = 'items-selection'
    }else if(type === 'status'){
      this.currentModal = 'status'
    }
  }

  clickG(event: any) {
    this.name = event.list;
  }

  arrowLeft() {
    if (this.currentModal === 'status') {
      this.currentModal = 'general'
    } else if (this.currentModal === 'edit') {
      this.currentModal = 'general'
    } else if (this.currentModal === 'colors') {
      this.currentModal = 'status'
    } else if (this.currentModal === 'items-selection') {
      this.currentModal = 'general'
    }
  }

  openModals(modal: string) {
    if (modal === 'edit') {
      this.currentModal = 'edit';
    } else if (modal === 'status') {
      this.currentModal = 'status';
    }
  }

  clickPlus() {
    if (this.currentModal === 'general') {
      this.name = 'Nova Propriedade'
      this.currentModal = 'edit';
    }if (this.currentModal === 'items-selection') {
      this.itemsList.push({ name: 'Novo item', status: 'visible', icon: faEye });
    }
  }
}
