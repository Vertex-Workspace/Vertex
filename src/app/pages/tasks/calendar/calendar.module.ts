import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalWarnModule } from 'src/app/components/modals/modal-warn/modal-warn.module';
import { CardModule } from 'src/app/components/reusable-components/card/card.module';
import { DragDropModule } from '@angular/cdk/drag-drop';



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
    ModalWarnModule,
    DragDropModule,
    CardModule
  ]
})
export class CalendarModule { }
