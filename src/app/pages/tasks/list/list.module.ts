import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { RowCardComponent } from 'src/app/components/reusable-components/row-task/row-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RowCardModule } from 'src/app/components/reusable-components/row-task/row-card.module';



@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DragDropModule,
    RowCardModule
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }