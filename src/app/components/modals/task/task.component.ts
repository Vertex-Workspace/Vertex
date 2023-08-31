import { Component } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  selectedPage: string = 'description';

  changePage(page: string): void {
    this.selectedPage = page;
  }

}
