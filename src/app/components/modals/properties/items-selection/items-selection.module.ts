import { EventEmitter, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsSelectionComponent } from './items-selection.component';

@NgModule({
  declarations: [ItemsSelectionComponent],
  exports: [ItemsSelectionComponent],
  imports: [
    CommonModule
  ]
})
export class GeneralPropertiesModule { 

  @Output()
  click = new EventEmitter<Event>();
  
  clickModal(){
    this.click.emit();
  }
}