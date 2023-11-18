import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { ListComponent } from './list/list.component';
import { KanbanComponent } from './kanban/kanban.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskModule } from 'src/app/components/modals/task/task.module';
import { TaskComponent } from 'src/app/components/modals/task/task.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from 'src/app/components/reusable-components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from './calendar/calendar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PropertiesModule } from 'src/app/components/modals/properties/properties.module';


@NgModule({
  declarations: [
    TasksComponent,
    KanbanComponent,
    ListComponent,
    CardComponent,
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
    PropertiesModule
  ],
})
export class TasksModule { }
