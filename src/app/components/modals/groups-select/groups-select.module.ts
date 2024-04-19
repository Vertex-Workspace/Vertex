import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsSelectComponent } from './groups-select.component';
import { ModalWarnModule } from '../modal-warn/modal-warn.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [GroupsSelectComponent],
  exports: [GroupsSelectComponent],
  imports: [
    CommonModule,
    ModalWarnModule,
    TranslateModule
  ]
})
export class GroupsSelectModule { }
