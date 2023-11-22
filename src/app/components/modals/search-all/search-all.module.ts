import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAllComponent } from './search-all.component';
import { ModalWarnModule } from '../modal-warn/modal-warn.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SearchAllComponent],
  exports: [SearchAllComponent],
  imports: [
    CommonModule,
    ModalWarnModule,
    FormsModule
  ]
})
export class SearchAllModule { }
