import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValuePropertyComponent } from './input-value-property.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [InputValuePropertyComponent],
  exports: [InputValuePropertyComponent],
  imports: [
    CommonModule, FormsModule
  ]
})
export class InputValuePropertyModule { }
