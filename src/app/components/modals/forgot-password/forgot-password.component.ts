import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { ForgotPasswordService } from 'src/app/services/forgotPassword.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  faEnvelope = faEnvelope;
  constructor(private forgotService: ForgotPasswordService, private userService: UserService, private alertService: AlertService, private translate: TranslateService) { 

    this.translate.setDefaultLang('pt');
  }

  emailTo: String = "";


  @Input()
  step: number = 1;

  @Input()
  forgotPassword: boolean = false;

  @Input()
  width!: string;

  @Input()
  height!: string;

  @Input()
  background!: string;

  @Output()
  forgot = new EventEmitter<boolean>();

  toForgotPassword(): void {
    this.forgotPassword = !this.forgotPassword;
    this.emailTo = "";
    this.password = "";
    this.passwordConf = "";
    this.confirmationCode = 0;
    this.step = 1;
    this.forgot.emit(false);
  }

  codeGeneratedByJava: number = 0;
  sendCodeToEmail() {
    console.log(this.step);


    this.step = 2;

    this.forgotService.sendMessageToEmail(this.emailTo).subscribe(
      (data) => {
        this.codeGeneratedByJava = data;
        this.alertService.successAlert(this.translate.instant("alerts.success.codeSent"));
        console.log(this.codeGeneratedByJava);
      },
      (error) => {
        this.alertService.errorAlert(this.translate.instant("alerts.success.codeNotSent"));
        console.log(error);
      }
    );

  }

  confirmationCode!: number;
  checkCode() {
    console.log(this.codeGeneratedByJava);

    if (this.codeGeneratedByJava == this.confirmationCode) {
      this.step = 3;
    }
  }

  password!: string;
  passwordConf!: string;
  checkPassword() {
    if (this.password == this.passwordConf) {
      this.userService.patchPassword(this.emailTo, this.password).subscribe(
        (data) => {
          this.alertService.successAlert(this.translate.instant("alerts.success.passwordUpdated"));
          this.toForgotPassword();
        },
        (error) => {
          console.log(error);
          
          this.alertService.errorAlert(error.error);
        }
      );
    } else {
      this.alertService.errorAlert('Senhas incompatíveis');
    }
  }


}
