import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './create-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardUserModule } from '../card-user/card-user.module';
import { ModalWarnModule } from '../../modals/modal-warn/modal-warn.module';
import { ButtonModule } from '../button/button.module';



@NgModule({
  declarations: [CreateGroupComponent],
  exports: [CreateGroupComponent],
  imports: [
    CommonModule,
    CardUserModule,
    ReactiveFormsModule,
    ModalWarnModule,
    ButtonModule
  ]
})
export class CreateGroupModule { }
