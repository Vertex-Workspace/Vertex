import { EventEmitter, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralPropertiesComponent } from './general-properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [GeneralPropertiesComponent],
  exports: [GeneralPropertiesComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DragDropModule
  ]
})
export class GeneralPropertiesModule { 

}