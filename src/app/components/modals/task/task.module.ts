import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { CommentsComponent } from './comments/comments.component';
import { LogComponent } from './log/log.component';
import { DescriptionComponent } from './description/description.component';
import { CommentComponent } from './comments/comment/comment.component';

@NgModule({
  declarations: [
    TaskComponent,
    CommentsComponent,
    LogComponent,
    DescriptionComponent,
    CommentComponent
  ],
  exports: [TaskComponent],
  imports: [CommonModule],
})
export class TaskModule {}
