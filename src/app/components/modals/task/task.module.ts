import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { CommentsComponent } from './comments/comments.component';
import { LogComponent } from './log/log.component';

@NgModule({
  declarations: [TaskComponent, CommentsComponent, LogComponent],
  exports: [TaskComponent],
  imports: [CommonModule],
})
export class TaskModule {}
