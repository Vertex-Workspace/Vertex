import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePipe } from '../name.pipe';
import { StatusPipe } from '../status-complete.pipe';
import { StatusBasicPipe } from '../status-basic.pipe';
import { SimplePropertyPipe } from '../property.pipe';



@NgModule({
  declarations: [
    NamePipe,
    StatusPipe,
    StatusBasicPipe,
    SimplePropertyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NamePipe,
    StatusPipe,
    StatusBasicPipe,
    SimplePropertyPipe
  ]
})
export class PipesModule { }
