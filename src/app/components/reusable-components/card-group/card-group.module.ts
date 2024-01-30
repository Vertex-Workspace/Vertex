import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';
import { CardGroupComponent } from './card-group.component';

@NgModule({
  declarations: [CardGroupComponent],
  exports: [CardGroupComponent],
  imports: [
    CommonModule,
    ConfirmModalModule
  ]
})

export class CardGroupModule { }