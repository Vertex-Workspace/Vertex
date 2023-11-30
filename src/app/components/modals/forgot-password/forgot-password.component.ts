import { Component, EventEmitter, Input,Output } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  faEnvelope = faEnvelope;

  @Input()
  step:number = 1;

  @Input()
  forgotPassword:boolean = false;

  @Input()
  width!: string;

  @Input()
  height!: string;

  @Input()
  background!: string;

  @Output()
  forgot = new EventEmitter<Event>();

  toForgotPassword():void{
    // localStorage.setItem("toForgotPassword",JSON.stringify(!this.forgotPassword));
    this.forgotPassword = !this.forgotPassword;
    this.step=1;
  }

  
  

}
