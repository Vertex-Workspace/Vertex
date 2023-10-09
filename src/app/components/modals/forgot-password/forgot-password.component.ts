import { Component, Input,Output } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  @Input()
  width!: string;

  @Input()
  height!: string;

  @Input()
  background!: string;

  

}
