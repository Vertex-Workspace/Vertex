import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/class/task';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent {

  @Input()
  task !: Task;


}
