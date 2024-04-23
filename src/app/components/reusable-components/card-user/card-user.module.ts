import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';
import { CardUserComponent } from './card-user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CardUserComponent],
  exports: [CardUserComponent],
  imports: [
    CommonModule,
    ConfirmModalModule,
    FontAwesomeModule,
    RouterLink,
    TranslateModule
  ]
})

export class CardUserModule { }