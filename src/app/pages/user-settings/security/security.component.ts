import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLock, faEye, faKey } from '@fortawesome/free-solid-svg-icons'
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent {
  faLock = faLock;
  faKey = faKey;
  click: string = 'initial';

  logged !: User;

  form !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alert: AlertService,
    private translate : TranslateService
  ) {
    this.logged = userService.getLogged();
  }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({

      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      newPasswordConf: [null, [Validators.required]]

    })

  }

  passwords = [
    { value: '', icon: faKey, status: false, label: 'Confirme sua senha antiga', statusEye: false, formControlName: 'oldPassword' },
    { value: '', icon: faLock, status: false, label: 'Digite uma nova senha', statusEye: false, formControlName: 'newPassword'  },
    { value: '', icon: faLock, status: false, label: 'Confirme sua nova senha', statusEye: false, formControlName: 'newPasswordConf' },
  ]

  onSubmit(): void {
    const formValue = this.form.value;

    if (this.passwordValidation()) {
      const userPasswordUpdate = {
        userId: this.logged.id!,
        newPassword: formValue.newPassword,
        oldPassword: formValue.oldPassword
      }      

      this.userService
        .updatePassword(userPasswordUpdate)
        .subscribe((success: boolean) => {
          this.alert.successAlert(this.translate.instant("alerts.success.passwordUpdated"));
        },
      e => {
        this.alert.errorAlert(this.translate.instant("alerts.error.errorPasswordUpdated"));
      })
      
    } else {
      this.alert
        .errorAlert(this.translate.instant("alerts.error.passwordIncompatible"));
    }
    
    this.form.reset();
  }

  clickOption(id: string): void {
    this.click = id;
  }

  passwordEye(item: any): void {
    item.statusEye = !item.statusEye;
  }

  passwordValidation(): boolean {
    const formValue = this.form.value;

    return formValue.newPassword === formValue.newPasswordConf;
  }

}