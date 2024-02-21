import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';
import {
  faCircleUser, faSquare, faUserMinus,
  faCaretDown, faCaretUp
} from '@fortawesome/free-solid-svg-icons';
import { PermissionsType, Permission, User} from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Group } from 'src/app/models/groups';
import { TeamService } from 'src/app/services/team.service';
import { GroupService } from 'src/app/services/group.service';
import { AlertService } from 'src/app/services/alert.service';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {

  users: User[] = [];

  name !: String

  @Output()
  user = new EventEmitter<User>();

  @Output()
  deleteUser = new EventEmitter<User>();

  @Output()
  patchOrSave = new EventEmitter<String>();

  @Input()
  height?: String;

  @Input()
  width?: String;

  @Input()
  group !: Group

  @Input()
  team !: Team

  @Input()
  typeString!: String;

  permissions: Permission[] = []

  constructor(private userService: UserService,
    private groupService: GroupService,
    private alert: AlertService,
    private teamService: TeamService) {
  }

  ngOnInit(): void {
    if (this.typeString === 'inTheGroup') {
      this.userService.getUsersByGroup(this.group.id).subscribe((users: User[]) => {
        this.users = users;
      });
    } else if (this.typeString === 'creating' || this.typeString === 'permissions' || this.typeString === 'view-infos') {
      this.userService.getUsersByTeam(this.team.id).subscribe((users: User[]) => {
        this.users = users;
      });
    } else if (this.typeString === 'addUsers') {
      this.groupService.getUsersOutOfGroup(this.team, this.group).subscribe((users: User[]) => {
        this.users = users;
      });
    }
  }

  faCircleUser = faCircleUser;
  faSquare = faSquare;
  faUserMinus = faUserMinus;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  selectUser(user: User): void {
    user.selected = !user.selected;
    if (user.selected) {
      this.user.emit(user);
    }
  }

  removeUser(user: User, typeString2: String): void {
    if(typeString2 === 'inTheGroup'){
    this.groupService.deleteUserFromGroup(user, this.team.id, this.group.id)
      .subscribe((group: Group) => {
        this.alert.successAlert(`Usuário retirado do grupo`)
        this.group.users?.splice(this.group.users.indexOf(user), 1);
      },
        e => {
          this.alert.errorAlert('Não foi possível retirar o usuário do grupo ')
        }
      )
    }else {
      this.deleteUserTeam()
    }
  }

  openPermissions(user: User, typeString2: String): void {
    if(typeString2 === 'permissions'){
      user.openPermission = !user.openPermission;
      this.getPermission(user);
    }else {
      user.openInfo = !user.openInfo
    }
  }

  selectPermission(user: User, permission: Permission): void {
    this.teamService.changePermissionEnable(permission, user, this.team).subscribe((permission) => {
      this.alert.successAlert('Autorização alterada!')
    })
  }

  getPermission(user: User): Permission[] | any {
    this.teamService.getPermission(this.team, user).subscribe((permissions: Permission[]) => {
      user.permissions = permissions;
    })
  }

  deleteUserTeam(): void {
    this.teamService.saveOrDeleteUserTeam(this.team).subscribe((team: Team) => {
      this.alert.successAlert("Usuário retirado da equipe")
      console.log(team);
      
    })
  }

}