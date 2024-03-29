import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './kanban.component';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'src/app/components/reusable-components/card/card.module';
import { ConfirmModalModule } from 'src/app/components/modals/confirm-modal/confirm-modal.module';
import { NamePipe } from 'src/app/pipes/name.pipe';
import { PipesModule } from 'src/app/pipes/module/pipes.module';



@NgModule({
  declarations: [ KanbanComponent],
  exports: [ KanbanComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FontAwesomeModule,
    DragDropModule,
    FormsModule,
    CardModule,
    ConfirmModalModule,
    PipesModule
  ]
})
export class KanbanModule { }
