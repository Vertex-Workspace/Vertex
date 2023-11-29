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
    PropertiesModule,
    ListModule,
    KanbanModule
  ],
})
export class TasksModule { }
