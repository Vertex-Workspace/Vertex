import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';
import { CardGroupComponent } from './card-group.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardUserModule } from '../card-user/card-user.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CreateGroupModule } from '../create-group/create-group.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CardGroupComponent],
  exports: [CardGroupComponent],
  imports: [
    CommonModule,
    ConfirmModalModule,
    FontAwesomeModule,
    CardUserModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmModalModule,
    AccordionModule,
    CreateGroupModule,
    MultiSelectModule,
    TranslateModule
  ]
})

export class CardGroupModule { }