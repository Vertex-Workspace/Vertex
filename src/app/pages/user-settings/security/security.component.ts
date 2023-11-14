import { Component } from '@angular/core';
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
    statusEye: boolean = false;

    passwords = [
        {type: 'oldPassword', icon: faKey, label:'Confirme sua senha antiga', status:false},
        {type: 'newPassword', icon: faLock, label:'Digite uma nova senha', status:false},
        {type: 'confirmPassword', icon: faLock, label:'Confirme sua nova senha', status:false},
    ]

    clickOption(id: string): void{
      this.click = id;
      this.contentEditable = !this.contentEditable
      console.log(this.click)
    }
  
      onChange(item : number): void {
      this.passwords[item].status = true;
      console.log(this.passwords[item].status)
      if((this.passwords[0].status == true) &&
      (this.passwords[1].status == true) &&
      (this.passwords[2].status == true)){
      this.contentEditable = true;
      }
      console.log(this.contentEditable)
    }

    passwordEye(): void {
      this.statusEye = !this.statusEye;
      console.log(1)
    }

}