import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

    @Output()
    close = new EventEmitter<Event>();
  
    @Input()
    height?: String;
  
    @Input()
    width?: String;
  
    closeModal(){
      this.close.emit();
    }

    deleteTeamConfirm(answer : string): void {
        if(answer == 'yes'){
            console.log('deletado');
        }
        else{
            console.log('cancelado');
        }
    }
}