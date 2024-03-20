import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './kanban.component';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'src/app/components/reusable-components/card/card.module';
import { NamePipe } from 'src/app/pipes/name.pipe';
import { PipesModule } from 'src/app/pipes/pipes/pipes.module';



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
    PipesModule
  ]
})
export class KanbanModule { }
