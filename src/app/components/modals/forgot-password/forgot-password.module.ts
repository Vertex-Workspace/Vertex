import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  exports: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    TranslateModule
  ]
})
export class ForgotPasswordModule {
  
  

}
