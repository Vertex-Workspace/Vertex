import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLock, faEye, faKey } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent {
  faLock = faLock;
  faKey = faKey;
  contentEditable: boolean = false;
  click: string = 'initial';
  validPassword: boolean = true;

  form !: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

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
    console.log(this.form.value);
  }

  clickOption(id: string): void {
    this.click = id;
    this.contentEditable = !this.contentEditable
  }

  onChange(item: number): void {
    this.passwords[item].status = true;
    if ((this.passwords[0].status == true) &&
      (this.passwords[1].status == true) &&
      (this.passwords[2].status == true)) {
      this.contentEditable = true;
    }
  }

  passwordEye(item: any): void {
    item.statusEye = !item.statusEye;
  }


  passwordValidation(): void {
    if (this.passwords[1].value != this.passwords[2].value) {
      this.validPassword = false;
    }
  }

  closeModal() {
    this.validPassword = true;
  }

}