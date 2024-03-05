import { Component, Input } from '@angular/core';
import { faCircleUser, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Comment, CommentSend } from 'src/app/models/comment';
import { Task } from 'src/app/models/task';
import { TaskResponsable } from 'src/app/models/taskResponsable';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() task!: Task;
  message: string = "";

  faCircleUser = faCircleUser;
  faTrash = faTrash;

  constructor(private taskService : TaskService, private userService : UserService) {}

  items = [
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            // this.update();
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
            // this.delete();
        }
    }
];



  userLoggedId: number = 0;
  ngOnInit(): void {
    this.userLoggedId = this.userService.getLogged().id!;

    setTimeout(() => {
      let a = document.getElementsByClassName("teste-scroll")[0] as HTMLElement;
      a.scrollTop = a.scrollHeight;
    }, 0);
  }

  sendComment(){
    let taskResponsable : TaskResponsable = this.task.taskResponsables!.find(taskResponsable => taskResponsable.userTeam.user.id === this.userService.getLogged().id)!;
    

    let comment : CommentSend = {
      date: null!,
      comment: this.message,
      taskID: this.task.id!,
      taskResponsableID: taskResponsable.id!
    }
    this.taskService.saveComment(comment).subscribe(
      (task: Task) => {
        this.task = task;
        this.message = ""
        setTimeout(() => {
          let a = document.getElementsByClassName("teste-scroll")[0] as HTMLElement;
          a.scrollTop = a.scrollHeight;
        }, 0);
      }
    );
  }

  getName(taskResponsable : TaskResponsable): string{
    return taskResponsable.userTeam.user.firstName + " " + taskResponsable.userTeam.user.lastName;
  }

  getDate(date: Date): any{
    return new Date(date).toLocaleString();
  }

  isLoggedUser(taskResponsable : TaskResponsable): boolean{
    return taskResponsable.userTeam.user.id === this.userLoggedId;
  }

  deleteComment(comment: Comment){
    this.taskService.deleteComment(this.task.id, comment.id!).subscribe(
      (bool:any) => {
        this.task.comments = this.task.comments!.filter(c => c.id !== comment.id);
        
      }
    );
  }
}