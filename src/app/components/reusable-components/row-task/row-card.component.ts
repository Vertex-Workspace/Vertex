import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import {
  faTrashCan, 
  faEnvelope, 
  faClockRotateLeft 
} from '@fortawesome/free-solid-svg-icons';
import { Value } from 'src/app/models/value';
import { PropertyKind } from 'src/app/models/property';

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

  value!: Value;

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

  getPropertyValue(col: any) : Value {
    let value : Value;
    this.task.values?.forEach(values => {
      if (col.id === values.property.id) {
        value = values;
      }
    });
    return value!;
  }

}
