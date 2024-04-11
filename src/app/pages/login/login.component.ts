import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { ResizeEvent } from 'angular-resizable-element';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/class/project';
import { AlertService } from 'src/app/services/alert.service';
import { ForgotPasswordService } from 'src/app/services/forgotPassword.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserStateService } from 'src/app/services/user-state.service';
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
  invisibleEye: boolean = true;
  forgotPassword: boolean = false;
  step: number = 1;

  form !: FormGroup;

  list: Observable<Project[]> = new Observable;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alert: AlertService,
    private userState: UserStateService,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {
    this.userState
      .getAuthenticationStatus()
      .subscribe((status: boolean) => {
        if (status) {
          this.router.navigate(['/home']);
        }
      })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({

      email: [null, [Validators.required]],
      password: [null, [Validators.required]]

    })

    this.userState
      .getAuthenticationStatus();

    this.isMobileTablet();

  }

  isMobileTablet() {
    return window.window.innerWidth < 1024;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: ResizeEvent) {
    // Chama toggleRightChat() sempre que o tamanho da tela for alterado
    this.isMobileTablet();
  }

  onSubmit(): void {
    this.userService
      .authenticate(this.form.value)
      .subscribe(user => {
        this.userService.login(user);
      },
        e => {
          return this.alert.errorAlert(e.error);
        });

  }

  passwordToggle(): void {
    this.invisibleEye = !this.invisibleEye;
  }

  toForgotPassword() {
    // localStorage.setItem("toForgotPassword",JSON.stringify(!this.forgotPassword));
    this.forgotPassword = !this.forgotPassword;
    this.step = 1;

  }
}
