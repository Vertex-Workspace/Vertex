import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePipe } from '../name.pipe';
import { StatusPipe } from '../status-complete.pipe';
import { StatusBasicPipe } from '../status-basic.pipe';
import { NameSortPipe } from '../sort/name-sort.pipe';
import { DateSortPipe } from '../sort/date-sort.pipe';
import { StatusSortPipe } from '../sort/status-sort.pipe';
import { SimplePropertyPipe } from '../simple-property.pipe';
import { SearchAllFilterPipe } from '../search-all-filter.pipe';



@NgModule({
  declarations: [
    NamePipe,
    StatusPipe,
    StatusBasicPipe,
    NameSortPipe,
    DateSortPipe,
    StatusSortPipe,
    SimplePropertyPipe,
    SearchAllFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NamePipe,
    StatusPipe,
    StatusBasicPipe,
    NameSortPipe,
    DateSortPipe,
    StatusSortPipe,
    SimplePropertyPipe,
    SearchAllFilterPipe
  ]
})
export class PipesModule { }
