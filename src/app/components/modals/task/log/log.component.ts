import { Component, Input } from '@angular/core';

interface LogRecord {
  description: string;
  date: Date;
}

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent {
  @Input() task: any;

  click(): void {
    console.log(this.task);
  }

  convertDateToString(item: LogRecord): string {
    return new Date(item.date).toLocaleDateString();
  }
  
}