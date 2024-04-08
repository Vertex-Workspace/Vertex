import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-warn',
  templateUrl: './modal-warn.component.html',
  styleUrls: ['./modal-warn.component.scss']
})
export class ModalWarnComponent {
  faTimes = faTimes;

  @Output()
  close = new EventEmitter<Event>();

  @Input()
  height?: String;

  @Input()
  width?: String;

  @Input()
  title?: String;

  closeModal(){
    this.close.emit();
  }
}
