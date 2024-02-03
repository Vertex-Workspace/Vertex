import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { CommentsComponent } from './comments/comments.component';
import { LogComponent } from './log/log.component';
import { PropertiesComponent } from './properties/properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MinichatModule } from '../minichat/minichat.module';
import { MinichatTASKModule } from '../minichat-task/minichat-task.module';


@NgModule({
  declarations: [
    TaskComponent,
    CommentsComponent,
    LogComponent,
    PropertiesComponent,
  ],
  exports: [TaskComponent],
  imports: [
    CommonModule,
     FontAwesomeModule, 
     FormsModule, MinichatTASKModule],
})
export class TaskModule {}
