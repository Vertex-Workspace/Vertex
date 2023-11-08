import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-warn',
  templateUrl: './modal-warn.component.html',
  styleUrls: ['./modal-warn.component.scss']
})
export class ModalWarnComponent {

  @Output()
  close = new EventEmitter<Event>();


  closeModal(){
    this.close.emit();
  }
}