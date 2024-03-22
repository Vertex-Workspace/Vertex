import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePipe } from '../name.pipe';
import { StatusPipe } from '../status-complete.pipe';
import { StatusBasicPipe } from '../status-basic.pipe';
import { NameSortPipe } from '../sort/name-sort.pipe';



@NgModule({
  declarations: [
    NamePipe,
    StatusPipe,
    StatusBasicPipe,
    NameSortPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NamePipe,
    StatusPipe,
    StatusBasicPipe,
    NameSortPipe
  ]
})
export class PipesModule { }
