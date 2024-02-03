import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';
import {
  faCircleUser, faSquare, faUserMinus,
  faCaretDown, faCaretUp
} from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Group } from 'src/app/models/groups';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {

  users: User[] = [];

  @Output()
  user = new EventEmitter<User>();

  @Input()
  height?: String;

  @Input()
  width?: String;

  @Input()
  group !: Group

  @Input()
  typeString!: String;

  constructor(private userService: UserService) { }

    ngOnInit(): void {
      if (this.typeString === 'inTheGroup') {
        this.userService.getUsersByGroup(this.group.id).subscribe((users: User[]) => {
          this.users = users;
        });
      }
    }

  faCircleUser = faCircleUser;
  faSquare = faSquare;
  faUserMinus = faUserMinus;
  faCaretDown = faCaretDown;

  selectUser(user: User): void {
    user.selected = !user.selected;
    if (user.selected) {
      this.user.emit(user);
      console.log(user);
    }
  }

  removeUser(): void {

  }

  openPermissions(user: User): void {
    user.openPermission = !user.openPermission;
  }

  permissionTypes = [
    { id: 'edit', label: 'Edição' },
    { id: 'preview', label: 'Visualização' },
    { id: 'create', label: 'Criação' }
  ]
}