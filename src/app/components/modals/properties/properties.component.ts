import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeft, faXmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

  faArrowLeft = faArrowLeft;
  faXmark = faXmark;
  currentModal: string = 'general';
  generalModal: boolean = true;

  @Output()
  close = new EventEmitter<Event>();

  @Input()
  height?: String;

  @Input()
  width?: String;

  closeModal(){
    this.close.emit();
  }

  clickGear(type: string){
    if(type === 'gear'){
      this.currentModal = 'status'
    }else if(type === 'plus'){
      this.currentModal = 'edit'
      console.log('add')
    }else if(type === 'pencil'){
      this.currentModal = 'colors'
    }
  }

  arrowLeft(){
    if(this.currentModal === 'status'){
      this.currentModal = 'general'
    }else if(this.currentModal === 'edit'){
      this.currentModal = 'general'
    }else if(this.currentModal === 'colors'){
      this.currentModal = 'status'
    }
  }

  openModals(modal: string){
    if(modal === 'add'){
      this.currentModal='add';
    }else if(modal==='status'){
      this.currentModal='status';
  }
  console.log(this.currentModal);
  console.log(this.generalModal);
}

}
