import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import { DeletedModule } from '../deleted/deleted.module';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ConfirmModalComponent],
  exports: [ConfirmModalComponent],
  imports: [
    CommonModule,
    DeletedModule,
    DragDropModule,
    TranslateModule
  ]
})
export class ConfirmModalModule { }