import { Component } from '@angular/core';
import { User } from 'src/app/models/class/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-denied-access',
  templateUrl: './denied-access.component.html',
  styleUrls: ['./denied-access.component.scss']
})
export class DeniedAccessComponent {

  loggedUser !: User

  constructor(private userService : UserService){
    this.loggedUser = this.userService.getLogged();
  }

}
