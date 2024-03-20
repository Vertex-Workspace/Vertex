import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list.component';
import { ModalWarnModule } from '../../modals/modal-warn/modal-warn.module';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateTeamProjectModule } from '../create-team-project/create-team-project.module';

@NgModule({
  declarations: [CardListComponent],
  exports: [CardListComponent],
  imports: [
    CommonModule,
    ConfirmModalModule,
    FontAwesomeModule,
    CreateTeamProjectModule
  ]
})

export class CardListModule { }