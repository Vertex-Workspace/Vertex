import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faEye,faEyeSlash,faLock } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  faEyeSlash = faEyeSlash
  faEye = faEye;
  faEnvelope = faEnvelope;
  faLock = faLock;
  invisibleEye:boolean = true;
  forgotPassword:boolean = false;
  step:number = 1;

  form !: FormGroup;

  list: Observable<Project[]> = new Observable;
 
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({

      email: [null, [Validators.required]],
      password: [null, [Validators.required]]

    })

  }

  onSubmit(): void {
    this.userService.authenticate(this.form.value);
  }
  
  passwordToggle():void{
    this.invisibleEye = !this.invisibleEye;
  }
  
  toForgotPassword():void{
    // localStorage.setItem("toForgotPassword",JSON.stringify(!this.forgotPassword));
    this.forgotPassword = !this.forgotPassword;
    this.step=1;
  }
}
