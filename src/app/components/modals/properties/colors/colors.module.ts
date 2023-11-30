import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsComponent } from './colors.component';

@NgModule({
  declarations: [ColorsComponent],
  exports: [ColorsComponent],
  imports: [
    CommonModule
  ]
})
export class ColorsModule { }