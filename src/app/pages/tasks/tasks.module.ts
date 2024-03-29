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
import { NoteModule } from 'src/app/components/reusable-components/note/note.module';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'src/app/components/reusable-components/card/card.module';
import { PropertiesModule } from 'src/app/components/modals/task/properties/properties.module';
import { InputTextModule } from 'primeng/inputtext';
import { CreateTeamProjectModule } from 'src/app/components/reusable-components/create-team-project/create-team-project.module';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { RatingModule } from 'primeng/rating';
import { ReviewTaskComponent } from 'src/app/components/modals/review-task/review-task.component';
import { PipesModule } from 'src/app/pipes/module/pipes.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
  declarations: [
    TasksComponent,
    MuralComponent
   ],
  exports:[
    TasksComponent
  ],
  imports: [
    JoyrideModule.forChild(),
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
    CardModule,
    PropertiesModule,
    InputTextModule,
    InputNumberModule,
    NoteModule,
    CreateTeamProjectModule,
    CascadeSelectModule,
    //Standalone component
    ReviewTaskComponent
  ],
})
export class TasksModule { }