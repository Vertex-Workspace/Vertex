import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { CommentsComponent } from './comments/comments.component';
import { LogComponent } from './log/log.component';
import { DescriptionComponent } from './description/description.component';
import { CommentComponent } from './comments/comment/comment.component';
import { PropertiesComponent } from './properties/properties.component';

@NgModule({
  declarations: [
    TaskComponent,
    CommentsComponent,
    LogComponent,
    DescriptionComponent,
    CommentComponent,
    PropertiesComponent
  ],
  exports: [TaskComponent],
  imports: [CommonModule],
})
export class TaskModule {}
