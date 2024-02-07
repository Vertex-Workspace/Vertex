import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from './calendar/calendar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PropertiesModule } from 'src/app/components/modals/properties/properties.module';
import { KanbanModule } from './kanban/kanban.module';
import { MuralCardComponent } from 'src/app/components/reusable-components/mural-card/mural-card.component';
import { ListModule } from './list/list.module';
import { MuralComponent } from './mural/mural.component';
import { TaskModule } from 'src/app/components/modals/task/task.module';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    TasksComponent,
    MuralComponent,
    MuralCardComponent,
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
    PropertiesModule
  ],
})
export class TasksModule { }