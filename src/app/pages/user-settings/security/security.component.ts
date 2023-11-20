import { Component, ViewChild } from '@angular/core';
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

  passwords = [
    { value: '', icon: faKey, label: 'Confirme sua senha antiga', status: false, statusEye: false },
    { value: '', icon: faLock, label: 'Digite uma nova senha', status: false, statusEye: false  },
    { value: '', icon: faLock, label: 'Confirme sua nova senha', status: false, statusEye: false  },
  ]

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