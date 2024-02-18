import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  exports: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
  ]
})
export class ForgotPasswordModule {
  
  

}
