import { EventEmitter, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsSelectionComponent } from './items-selection.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemsSelectionComponent],
  exports: [ItemsSelectionComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class ItemsSelectionModule { 

}