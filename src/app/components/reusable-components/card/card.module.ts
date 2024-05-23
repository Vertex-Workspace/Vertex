import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


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
    FormsModule,
    DragDropModule,
    ConfirmModalModule,
    TranslateModule
  
  ]
})
export class CardModule { }
