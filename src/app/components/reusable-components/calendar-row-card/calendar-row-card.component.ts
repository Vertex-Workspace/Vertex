import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PropertyList } from 'src/app/models/class/property';
import { Task } from 'src/app/models/class/task';

@Component({
  selector: 'app-calendar-row-card',
  templateUrl: './calendar-row-card.component.html',
  styleUrls: ['./calendar-row-card.component.scss']
})
export class CalendarRowCardComponent {
  
  @Input()
  task !: Task;

  @Output()
  openTask: EventEmitter<Task> = new EventEmitter;

  @Output()
  deleteEmt: EventEmitter<Task> = new EventEmitter;

  getStatusColor(task: Task): string {
    const pl: PropertyList = task.values[0].value as PropertyList;
    return pl.color;
  }

  openTaskDetails() {
    this.openTask.emit(this.task);
  }

  deleteTs(event: any) {
    event.stopPropagation();
    this.deleteEmt.emit(this.task);
  }
  
}
