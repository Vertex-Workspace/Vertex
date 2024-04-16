import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/class/task';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

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
    private taskService: TaskService,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    console.log(this.task);
    
  }

  onFileSelected(e: any): void {
    const selectedFile = e.target.files[0];
    const fd: FormData = new FormData();
    fd.append('file', selectedFile, selectedFile.name);    

    this.taskService
      .uploadFile(fd, this.task.id!, this.userService.getLogged().id!)
      .subscribe((task: Task) => {
        this.task = task;
        this.alert.successAlert(`Arquivo anexado em ${task.name}!`);
      });
  }

  fileRemoveHandler(file: any): void {
    this.taskService
      .removeFile(this.task.id, file.id)
      .subscribe((task: Task) => {
        this.task = task;
      })
  }

}
