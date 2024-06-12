import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalWarnModule } from 'src/app/components/modals/modal-warn/modal-warn.module';
import { CardModule } from 'src/app/components/reusable-components/card/card.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalendarModule } from 'primeng/calendar';
import { PipesModule } from 'src/app/pipes/module/pipes.module';
import { FormsModule } from '@angular/forms';
import { CalendarRowCardComponent } from 'src/app/components/reusable-components/calendar-row-card/calendar-row-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModalModule } from 'src/app/components/modals/confirm-modal/confirm-modal.module';



@NgModule({
  declarations: [
    CalendarComponent,
    CalendarRowCardComponent
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
    CardModule,
    DragDropModule,
    PipesModule,
    CalendarModule,
    FormsModule,
    TranslateModule,
    ConfirmModalModule
  ]
})
export class CalendarScreenModule { }
export { CalendarModule };

