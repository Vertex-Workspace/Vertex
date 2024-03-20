import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { CommentsComponent } from './comments/comments.component';
import { LogComponent } from './log/log.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MinichatModule } from '../minichat/minichat.module';
import { MinichatTASKModule } from '../minichat-task/minichat-task.module';
import { PropertiesModule } from './properties/properties.module';
import { MenuModule } from 'primeng/menu';
import { ConfirmModalModule } from '../confirm-modal/confirm-modal.module';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    TaskComponent,
    CommentsComponent,
    LogComponent
  ],
  exports: [TaskComponent],
  imports: [
    CommonModule,
     FontAwesomeModule, 
     FormsModule, 
     MinichatTASKModule,
     PropertiesModule,
     MenuModule,
     ConfirmModalModule,
     CheckboxModule
    ],
})
export class TaskModule { }
