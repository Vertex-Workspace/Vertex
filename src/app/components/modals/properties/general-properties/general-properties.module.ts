import { EventEmitter, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralPropertiesComponent } from './general-properties.component';

@NgModule({
  declarations: [GeneralPropertiesComponent],
  exports: [GeneralPropertiesComponent],
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