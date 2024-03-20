import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePipe } from '../name.pipe';
import { StatusPipe } from '../status.pipe';



@NgModule({
  declarations: [
    NamePipe,
    StatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NamePipe,
    StatusPipe
  ]
})
export class PipesModule { }
