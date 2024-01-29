import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { cols,
     } from 'src/app/pages/tasks/data-test';
import {
  faTrashCan, 
  faEnvelope, 
  faClockRotateLeft 
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-row-card',
  templateUrl: './row-card.component.html',
  styleUrls: ['./row-card.component.scss']
})
export class RowCardComponent {
  
  faClock = faClockRotateLeft;
  faEnvelope = faEnvelope;
  faTrashCan = faTrashCan;


  @Input()
  task!: Task;

  @Input()
  cols!: any[];

  icons: any[] = [
    { id: 'clock', icon: this.faClock },
    { id: 'chat', icon: this.faEnvelope },
    { id: 'delete', icon: this.faTrashCan }
  ];

  getNameWidth(): string {
    const obj = cols.find(c => {
      return c.field === 'name';
    })
    return obj!.width;
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
