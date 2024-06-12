import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalWarnComponent } from './modal-warn.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [ModalWarnComponent],
  exports: [ModalWarnComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class ModalWarnModule { }
