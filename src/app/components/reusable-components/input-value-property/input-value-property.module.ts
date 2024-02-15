import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValuePropertyComponent } from './input-value-property.component';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@NgModule({
  declarations: [
    InputValuePropertyComponent
  ],
  exports: [InputValuePropertyComponent],
  imports: [
    CommonModule, FormsModule, CascadeSelectModule
  ]
})
export class InputValuePropertyModule { }
