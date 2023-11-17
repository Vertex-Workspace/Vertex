import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { cols } from 'src/app/pages/tasks/data-test';
import {
  faTrashCan, 
  faEnvelope, 
  faClockRotateLeft 
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-row-card',
  templateUrl: './row-card.component.html',
  styleUrls: ['./row-card.component.scss']
})
export class RowCardComponent {
  
  faClock = faClockRotateLeft;
  faEnvelope = faEnvelope;
  faTrashCan = faTrashCan;

  cols: any[] = cols;

  @Input()
  task!: Task;

  icons: any[] = [
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

  getPropertyValue(col: any): string {
    const prop = this.findPropertyInTask(col);

    if (prop) {
      return prop.value.toString();
    }

    return " - ";    
  }

  findPropertyInTask(prop: any): any {
    return this.task.properties?.find(p => {
      return p.name === prop.field;
    });
  }

  getPropertyColor(col: any): string {
    const prop = this.findPropertyInTask(col);

    if (prop !== undefined 
              && Object.hasOwn(prop, 'bgColor')) {
      return prop.bgColor + "99";
    }

    return "#F3F3F3";
  }

}
