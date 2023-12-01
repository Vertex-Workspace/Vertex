import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { cols,
         homeCols } from 'src/app/pages/tasks/data-test';
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

  cols: any[] = cols;
  homeCols: any[] = homeCols;

  @Input()
  task!: Task;

  icons: any[] = [
    { id: 'clock', icon: this.faClock },
    { id: 'chat', icon: this.faEnvelope },
    { id: 'delete', icon: this.faTrashCan }
  ];

  constructor(
    private router: Router
  ) {}

  getNameWidth(): string {
    const obj = this.getCols().find(c => {
      return c.field === 'name';
    })

    return obj.width;
  }

  getCols(): any[] {
    if (this.router.url === '/tarefas/lista') {
      return this.cols;
    }

    return this.homeCols;
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
