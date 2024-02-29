import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/class/task';
import {
  faTrashCan, 
  faEnvelope, 
  faClockRotateLeft, 
  faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
import { Value } from 'src/app/models/class/value';
import { PropertyKind } from 'src/app/models/class/property';


@Component({
  selector: 'app-row-card',
  templateUrl: './row-card.component.html',
  styleUrls: ['./row-card.component.scss']
})
export class RowCardComponent {
  faEllipsisVertical = faEllipsisVertical;
  faClock = faClockRotateLeft;
  faEnvelope = faEnvelope;
  faTrashCan = faTrashCan;


  @Input()
  task!: Task;

  @Input()
  cols!: any[];

  modalDelete: boolean = false;
  @Output() openTaskDetails = new EventEmitter();

  value!: Value;

  icons: any[] = [
    // { id: 'clock', icon: this.faClock },
    // { id: 'chat', icon: this.faEnvelope },
    { id: 'delete', icon: this.faTrashCan }
  ];

  ngOnInit(): void {    
  }

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
    return "300px";
  }

  getPropertyValue(col: any) : Value {
    let value : Value;
    this.task.values?.forEach(values => {
      if (col.field === values.property.kind) {
        value = values;
      }
    });
    return value!;
  }

  openTask(): void {
    if(!this.modalDelete){
      this.openTaskDetails.emit();

    }
  }

}
