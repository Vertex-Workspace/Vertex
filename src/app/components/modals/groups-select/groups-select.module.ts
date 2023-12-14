import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsSelectComponent } from './groups-select.component';
import { ModalWarnModule } from '../modal-warn/modal-warn.module';



@NgModule({
  declarations: [GroupsSelectComponent],
  exports: [GroupsSelectComponent],
  imports: [
    CommonModule,
    ModalWarnModule
  ]
})
export class GroupsSelectModule { }
