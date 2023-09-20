import { Component } from '@angular/core';
import { comments } from 'src/data/data';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  commentsList = comments;

}
