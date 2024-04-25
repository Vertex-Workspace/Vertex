import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarScreenModule } from './calendar/calendar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalPropertiesModule } from 'src/app/components/modals/properties/modal-properties.module';
import { KanbanModule } from './kanban/kanban.module';
import { ListModule } from './list/list.module';
import { MuralComponent } from './mural/mural.component';
import { ChartModule } from 'primeng/chart';
import { NoteModule } from 'src/app/components/reusable-components/note/note.module';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'src/app/components/reusable-components/card/card.module';
import { PropertiesModule } from 'src/app/components/modals/task/properties/properties.module';
import { InputTextModule } from 'primeng/inputtext';
import { CreateTeamProjectModule } from 'src/app/components/reusable-components/create-team-project/create-team-project.module';
import { AttachmentItemComponent } from 'src/app/components/reusable-components/attachment-item/attachment-item.component';
import { AttachmentsComponent } from 'src/app/components/modals/task/attachments/attachments.component';
import { LogComponent } from 'src/app/components/modals/task/log/log.component';

import { RatingModule } from 'primeng/rating';
import { ReviewTaskComponent } from 'src/app/components/modals/review-task/review-task.component';
import { PipesModule } from 'src/app/pipes/module/pipes.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TaskModule } from 'src/app/components/modals/task/task.module';
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
    TaskModule,
    JoyrideModule.forChild(),
    CommonModule,
    RouterModule,
    BrowserModule,
    FontAwesomeModule,
    DragDropModule,
    FormsModule,
    CalendarScreenModule,
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
    ReviewTaskComponent,
    PipesModule
  ],
})
export class TasksModule { }