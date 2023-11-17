import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list.component';
import { ModalWarnModule } from '../../modals/modal-warn/modal-warn.module';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';

@NgModule({
  declarations: [CardListComponent],
  exports: [CardListComponent],
  imports: [
    CommonModule,
    ConfirmModalModule
  ]
})

export class CardListModule { }
