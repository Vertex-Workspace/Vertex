import { EventEmitter, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsSelectionComponent } from './items-selection.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ConfirmModalModule } from '../../confirm-modal/confirm-modal.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ItemsSelectionComponent],
  exports: [ItemsSelectionComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FontAwesomeModule,
    FormsModule,
    ConfirmModalModule,
    TranslateModule
  ]
})
export class ItemsSelectionModule { 

}