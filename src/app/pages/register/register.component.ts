import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser,faEnvelope, faLock, faKey,faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/class/user';
import { UserStateService } from 'src/app/services/user-state.service';
import { UserService } from 'src/app/services/user.service';

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

  form !: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userState: UserStateService
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

      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordConf: [null, [Validators.required]]

    })
    
  }

  invisibleEye1:boolean = true;
  invisibleEye2:boolean = true;
  

  passwordToggle1():void{
    this.invisibleEye1 = !this.invisibleEye1;
  }

  passwordToggle2():void{
    this.invisibleEye2 = !this.invisibleEye2;
  }
  onSubmit(): void {
    this.userService
        .register(this.form.value);
        
  
  } 



}
