import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsComponent } from './colors.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ColorsComponent],
  exports: [ColorsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class ColorsModule { }