import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
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
  constructor(private forgotService: ForgotPasswordService, private userService: UserService, private alertService: AlertService) { }

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
    // localStorage.setItem("toForgotPassword",JSON.stringify(!this.forgotPassword));
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
        this.alertService.successAlert("Código enviado com sucesso!");
        console.log(this.codeGeneratedByJava);
      },
      (error) => {
        this.alertService.errorAlert("Erro ao enviar código!");
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
          console.log(data);
          this.alertService.successAlert("Senha alterada com sucesso!");
          this.toForgotPassword();
        },
        (error) => {
          this.alertService.errorAlert("Erro ao alterar senha!");
          console.log(error);
        }
      );
    }
  }


}
