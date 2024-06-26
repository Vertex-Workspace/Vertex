import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './create-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardUserModule } from '../card-user/card-user.module';
import { ModalWarnModule } from '../../modals/modal-warn/modal-warn.module';
import { ButtonModule } from '../button/button.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [CreateGroupComponent],
  exports: [CreateGroupComponent],
  imports: [
    CommonModule,
    CardUserModule,
    ReactiveFormsModule,
    ModalWarnModule,
    ButtonModule,
    MultiSelectModule,
    TranslateModule
  ]
})
export class CreateGroupModule { }
