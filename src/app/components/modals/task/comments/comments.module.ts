import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';



@NgModule({
  declarations: [
    CommentComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommentComponent
  ]
})
export class CommentsModule { }
