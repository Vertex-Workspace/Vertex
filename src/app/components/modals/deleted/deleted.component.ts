import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.scss']
})
export class DeletedComponent {

  secondModal: boolean = false;

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