import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { ModalWarnModule } from 'src/app/components/modals/modal-warn/modal-warn.module';



@NgModule({
  declarations: [
    CalendarComponent
  ],
  exports: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FontAwesomeModule,
    DragDropModule,
    ModalWarnModule,
    CdkDrag
  ]
})
export class CalendarModule { }
