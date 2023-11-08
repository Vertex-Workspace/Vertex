import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';



@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  exports:[ForgotPasswordComponent],
  imports: [
    CommonModule
  ]
})
export class ForgotPasswordModule { }
