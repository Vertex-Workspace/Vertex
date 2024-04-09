import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/class/project';
import { Team } from 'src/app/models/class/team';
import { TeamService } from 'src/app/services/team.service';

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

    @Input()
    type?: String;

    @Input()
    project?: Project

    @Input()
    buttonText?: String;

    team!:Team

    @Output() confirmEvent = new EventEmitter<boolean>();

    sendTrueEvent() {
      this.confirmEvent.emit(true);
    }

    sendFalseEvent() {
      this.confirmEvent.emit(false);
    }

    constructor(
      private route: ActivatedRoute,
      private teamService: TeamService
    ) {}

    closeModal(){
      this.close.emit();
    }

    deleteConfirm(answer : boolean): void {
      if(answer === true){
        this.sendTrueEvent()
      }else {
        this.sendFalseEvent()
      }
      this.close.emit(answer);
    }

    ngOnInit(): void {
      if(this.buttonText === undefined){
        this.buttonText = "Confirmar"
      }
    }
}