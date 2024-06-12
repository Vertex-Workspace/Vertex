import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetNewPasswordComponent } from './set-new-password.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SetNewPasswordComponent],
  exports: [SetNewPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class SetNewPasswordModule { }
