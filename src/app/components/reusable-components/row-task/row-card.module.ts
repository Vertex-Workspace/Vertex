import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowCardComponent } from './row-card.component';
import { FormsModule } from '@angular/forms';
import { InputValuePropertyComponent } from '../input-value-property/input-value-property.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputValuePropertyModule } from '../input-value-property/input-value-property.module';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [RowCardComponent],
  exports: [RowCardComponent],
  imports: [
    CommonModule, FormsModule, FontAwesomeModule, InputValuePropertyModule, ConfirmModalModule,TranslateModule
  ]
})
export class RowCardModule { }
