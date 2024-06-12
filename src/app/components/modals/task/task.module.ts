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
import { AttachmentsComponent } from 'src/app/components/modals/task/attachments/attachments.component';
import { AttachmentItemComponent } from '../../reusable-components/attachment-item/attachment-item.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TaskComponent,
    CommentsComponent,
    LogComponent,
    AttachmentsComponent,
    AttachmentItemComponent
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
     CheckboxModule,
     TranslateModule
    ],
})
export class TaskModule { }
