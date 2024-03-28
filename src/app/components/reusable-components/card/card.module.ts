import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';


@NgModule({
  declarations: [
    CardComponent
  ],
  exports:[
    CardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DragDropModule,
    ConfirmModalModule,
  
  ]
})
export class CardModule { }
