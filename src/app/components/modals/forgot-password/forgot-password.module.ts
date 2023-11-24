import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  exports:[ForgotPasswordComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class ForgotPasswordModule { }
