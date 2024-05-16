import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChangePassword, User } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent {

  logged !: User
  
  password !: string

  @Output()
  close = new EventEmitter();

  isVisible: boolean = false;

  constructor(private userService: UserService,
    private alertService: AlertService,
    private translate : TranslateService
  ) {
    this.logged = this.userService.getLogged()
  }

  sendNewPassword() {
    let changePassword: ChangePassword = {
      id: this.logged.id,
      password: this.password
    };

    if (this.password == null) {
      this.alertService.errorAlert("Você precisa enviar uma senha")
    } else {

      this.userService.changePassword(changePassword).subscribe(() => {
        this.alertService.successAlert(this.translate.instant("alerts.success.new-password")
      )},
        e => {
          this.alertService.errorAlert(this.translate.instant("alerts.error.new-password"))
        }
      );
    }
  }

  changeEyeIcon(){
    this.isVisible = !this.isVisible;
  }

}
