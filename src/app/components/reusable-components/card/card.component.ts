import { Component, Input } from '@angular/core';
import { faCircleUser, 
          faTrashCan, 
          faEnvelope, 
          faClockRotateLeft 
        } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  faCircleUser = faCircleUser;
  faEnvelope = faEnvelope;
  faTrashCan = faTrashCan;
  faClock = faClockRotateLeft;
  
  @Input() task !: Task;


  @Input() width!: string;
  @Input() minHeight!: string;
  settings = [
    { id: 'clock', icon: this.faClock, onclick: () => this.clock() },
    { id: 'chat', icon: this.faEnvelope, onclick: () => this.openChat() },
    { id: 'delete', icon: this.faTrashCan, onclick: () => this.delete() }
  ];

  openChat(): void {
    console.log('open chat');
  }

  delete(): void {
    console.log('delete');
  }

  clock(): void {
    console.log('clock');
  }

}
