import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import { DeletedModule } from '../deleted/deleted.module';


@NgModule({
  declarations: [ConfirmModalComponent],
  exports: [ConfirmModalComponent],
  imports: [
    CommonModule,
    DeletedModule
  ]
})
export class ConfirmModalModule { }