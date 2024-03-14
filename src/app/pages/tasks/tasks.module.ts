import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from './calendar/calendar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalPropertiesModule } from 'src/app/components/modals/properties/modal-properties.module';
import { KanbanModule } from './kanban/kanban.module';
import { ListModule } from './list/list.module';
import { MuralComponent } from './mural/mural.component';
import { TaskModule } from 'src/app/components/modals/task/task.module';
import { ChartModule } from 'primeng/chart';
import { NoteComponent } from 'src/app/components/reusable-components/note/note.component';
import { NoteModule } from 'src/app/components/reusable-components/note/note.module';
import { BadgeModule } from 'primeng/badge';
import { ModalWarnModule } from 'src/app/components/modals/modal-warn/modal-warn.module';
import { CardModule } from 'src/app/components/reusable-components/card/card.module';
import { PropertiesModule } from 'src/app/components/modals/task/properties/properties.module';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    TasksComponent,
    MuralComponent,
   ],
  exports:[
    TasksComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FontAwesomeModule,
    DragDropModule,
    FormsModule,
    CalendarModule,
    TaskModule,
    ListModule,
    KanbanModule,
    ChartModule,
    ModalPropertiesModule,
    NoteModule,
    ReactiveFormsModule,
    BadgeModule,
    ModalWarnModule,
    CardModule,
    PropertiesModule,
    InputTextModule
  ],
})
export class TasksModule { }