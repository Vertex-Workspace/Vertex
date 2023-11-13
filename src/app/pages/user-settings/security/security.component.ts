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
    faEye = faEye;
    contentEditable: boolean = false;
    click: string = 'initial';

    passwords = [
        {type: 'oldPassword', icon: faKey, label:'Confirme sua senha antiga'},
        {type: 'newPassword', icon: faLock, label:'Digite uma nova senha'},
        {type: 'confirmPassword', icon: faLock, label:'Confirme sua nova senha'},
    ]

    clickOption(id: string): void{
      this.click = id;
      this.contentEditable = !this.contentEditable
      console.log(this.click)
    }
  
      onChange(): void {
      console.log(this.contentEditable)
      if(this.contentEditable == false){
      this.contentEditable = !this.contentEditable;
      }
    }

}