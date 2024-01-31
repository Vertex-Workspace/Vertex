import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';
import { CardGroupComponent } from './card-group.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardUserModule } from '../card-user/card-user.module';

@NgModule({
  declarations: [CardGroupComponent],
  exports: [CardGroupComponent],
  imports: [
    CommonModule,
    ConfirmModalModule,
    FontAwesomeModule,
    CardUserModule
  ]
})

export class CardGroupModule { }