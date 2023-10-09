import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForgotPasswordModule } from 'src/app/components/modals/forgot-password/forgot-password.module';




@NgModule({
  declarations: [LoginComponent],
  exports:[LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    PasswordModule,
    ForgotPasswordModule,
    FontAwesomeModule
  ],
})
export class LoginModule { 

  

}
