import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuralComponent } from './mural.component';



@NgModule({
  declarations: [MuralComponent],
  exports: [MuralComponent],
  imports: [
    CommonModule
  ]
})
export class MuralModule { }
