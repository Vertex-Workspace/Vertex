import { Component } from '@angular/core';
import { faUser,faEnvelope, faLock, faKey,faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faEye = faEye;
  faLock = faLock;
  faEyeSlash = faEyeSlash
  faKey = faKey;

  invisibleEye1:boolean = true;
  invisibleEye2:boolean = true;
  

  passwordToggle1():void{
    this.invisibleEye1 = !this.invisibleEye1;
  }

  passwordToggle2():void{
    this.invisibleEye2 = !this.invisibleEye2;
  }
}
