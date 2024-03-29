import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import { DeletedModule } from '../deleted/deleted.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [ConfirmModalComponent],
  exports: [ConfirmModalComponent],
  imports: [
    CommonModule,
    DeletedModule,
    DragDropModule
  ]
})
export class ConfirmModalModule { }