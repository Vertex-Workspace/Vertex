import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-row-card',
  templateUrl: './row-card.component.html',
  styleUrls: ['./row-card.component.scss']
})
export class RowCardComponent {

  @Input()
  task!: Task;

  @Output() //eventemitter<property>!!!
  verifyColumn: EventEmitter<boolean> = new EventEmitter();

  hasValue(prop: any[]): boolean {
    // const a = this.verifyColumn.emit(prop, this.task)
    return false;
  }

}
