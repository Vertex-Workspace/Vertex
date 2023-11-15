import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';


@NgModule({
  declarations: [ConfirmModalComponent],
  exports: [ConfirmModalComponent],
  imports: [
    CommonModule
  ]
})
export class ConfirmModalModule { }