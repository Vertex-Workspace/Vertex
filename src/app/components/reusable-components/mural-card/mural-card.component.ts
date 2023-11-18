import { Component, Input } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-mural-card',
  templateUrl: './mural-card.component.html',
  styleUrls: ['./mural-card.component.scss'],
})
export class MuralCardComponent {

  @Input() 
  task !: Task;

  configItems = [
    { id: 'link', iconClass: 'pi pi-link' },
    { id: 'image', iconClass: 'pi pi-images' },
    { id: 'edit', iconClass: 'pi pi-pencil' },
  ];

  hasImage(): boolean {
    return Object.hasOwn(this.task, 'image');;
  }


}
