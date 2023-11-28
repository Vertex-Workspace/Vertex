import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { RowCardComponent } from 'src/app/components/reusable-components/row-task/row-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ListComponent,
    RowCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DragDropModule,
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
