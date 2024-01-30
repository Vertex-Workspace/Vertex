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
import { Property } from 'src/app/models/property';

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

  getCols(): any[] {
    let cols : any [] = [];
    this.cols.map((col) => { 
      if(col.field !== "name") {
        cols.push(col);
      }
    });
    return cols;
  }

  getNameWidth(): string {
    return "40%";
  }

  getPropertyValue(col: any): string {
    this.task.values?.find(values => {
      this.cols.forEach((col) => {
        if (col.field === values.property.kind) {
          return values.value;
        }
      });     
    });
    return " - ";    
  }

  findPropertyInTask(prop: any): any {
    return 
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
