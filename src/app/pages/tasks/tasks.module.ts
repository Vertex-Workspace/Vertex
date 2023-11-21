import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { ListComponent } from './list/list.component';
import { KanbanComponent } from './kanban/kanban.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskModule } from 'src/app/components/modals/task/task.module';
import { TaskComponent } from 'src/app/components/modals/task/task.component';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from 'src/app/components/reusable-components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from './calendar/calendar.module';
import { KanbanModule } from './kanban/kanban.module';
import { MuralCardComponent } from 'src/app/components/reusable-components/mural-card/mural-card.component';
import { RowCardComponent } from 'src/app/components/reusable-components/row-task/row-card.component';
import { MuralComponent } from './mural/mural.component';


@NgModule({
  declarations: [
    TasksComponent,
    ListComponent,
    MuralCardComponent,
    RowCardComponent,
    MuralComponent
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
    KanbanModule
  ],
})
export class TasksModule { }
