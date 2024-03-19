import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/class/task';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent {

  @Input()
  task !: Task;

  fd !: FormData;

  constructor(
    private alert: AlertService,
    private taskService: TaskService
  ) {}

  onFileSelected(e: any): void {
    const selectedFile = e.target.files[0];
    const fd: FormData = new FormData();
    fd.append('file', selectedFile, selectedFile.name);    

    console.log(fd);

    this.taskService
      .uploadFile(fd, this.task.id!)
      .subscribe((task: Task) => {
        this.task = task;
        this.alert.successAlert('Imagem atualizada com sucesso!');
      });
  }

}
