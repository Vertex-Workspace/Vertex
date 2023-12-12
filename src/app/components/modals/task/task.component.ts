import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Output() close = new EventEmitter();

  @Output() changes = new EventEmitter();

  @Input() task!: Task;

  selectedComponent: string = 'description';

  navigate(component: string): void {
    this.selectedComponent = component;
  }

  closeModal(): void {
    this.close.emit();
  }

  changeTask(event : any): void{
    this.changes.emit(event);
  }
}