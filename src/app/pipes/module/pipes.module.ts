import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePipe } from '../name.pipe';
import { StatusPipe } from '../status-complete.pipe';
import { StatusBasicPipe } from '../status-basic.pipe';



@NgModule({
  declarations: [
    NamePipe,
    StatusPipe,
    StatusBasicPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NamePipe,
    StatusPipe,
    StatusBasicPipe
  ]
})
export class PipesModule { }
