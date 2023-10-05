import { Component } from '@angular/core';
import { faEnvelope, faEye,faEyeSlash,faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  faEyeSlash = faEyeSlash
  faEye = faEye;
  faEnvelope = faEnvelope;
  faLock = faLock;

  invisibleEye:boolean = true;
  

  passwordToggle():void{
    this.invisibleEye = !this.invisibleEye;
  }
}
