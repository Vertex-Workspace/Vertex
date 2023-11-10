import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalWarnComponent } from './modal-warn.component';



@NgModule({
  declarations: [ModalWarnComponent],
  exports: [ModalWarnComponent],
  imports: [
    CommonModule
  ]
})
export class ModalWarnModule { }
