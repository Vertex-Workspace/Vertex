import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAllComponent } from './search-all.component';
import { ModalWarnModule } from '../modal-warn/modal-warn.module';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PipesModule } from 'src/app/pipes/module/pipes.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [SearchAllComponent],
  exports: [SearchAllComponent],
  imports: [
    CommonModule,
    ModalWarnModule,
    FormsModule,
    DropdownModule,
    PipesModule,
    TranslateModule
  ]
})
export class SearchAllModule { }
