import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  secondModal: boolean = false;

    @Output()
    close = new EventEmitter();
  
    @Input()
    height?: String;
  
    @Input()
    width?: String;

    @Input()
    title?: String;

  
    closeModal(){
      this.close.emit();
    }

    deleteTeamConfirm(answer : boolean): void {
        this.close.emit(answer);
    }

    // deletedTeam(): void {
    //   this.secondModal = false;
    //   this.closeModal()
    // }
}