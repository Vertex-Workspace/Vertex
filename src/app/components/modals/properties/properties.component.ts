import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeft, faXmark, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

  faArrowLeft = faArrowLeft;
  faXmark = faXmark;
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  currentModal: string = 'general';
  generalModal: boolean = true;
  text: string | undefined;
  propertiesType: any;

  @Output()
  close = new EventEmitter<Event>();

  @Output()
  item = new EventEmitter<String>();

  @Input()
  height?: String;

  @Output()
  name = new EventEmitter();

  @Input()
  width?: String;

  closeModal() {
    this.close.emit();
  }

  clickGear(type: string) {
    if (type === 'gear') {
      this.currentModal = 'status'
    } else if (type === 'plus') {
      this.currentModal = 'edit'
    } else if (type === 'pencil') {
      this.currentModal = 'colors'
    } else if (type === 'edit') {
      this.currentModal = 'edit'
    } else if (type === 'items-selection') {
      this.currentModal = 'items-selection'
    }
  }

  clickG(event : any){
    console.log(event.list)
    console.log({name: event.list});
  }

  arrowLeft() {
    if (this.currentModal === 'status') {
      this.currentModal = 'general'
    } else if (this.currentModal === 'edit') {
      this.currentModal = 'general'
    } else if (this.currentModal === 'colors') {
      this.currentModal = 'status'
    } else if (this.currentModal === 'items-selection') {
      this.currentModal = 'edit'
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
      this.currentModal = 'edit'
    }
  }

}
