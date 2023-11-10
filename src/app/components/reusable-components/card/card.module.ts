import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DragDropModule
  ]
})
export class CardModule { }
