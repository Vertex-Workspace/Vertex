import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/class/team';
import {
  faCircleUser, faSquare, faUserMinus,
  faCaretDown, faCaretUp
} from '@fortawesome/free-solid-svg-icons';
import { PermissionsType, Permission, User } from 'src/app/models/class/user';
import { UserService } from 'src/app/services/user.service';
import { Group } from 'src/app/models/class/groups';
import { TeamService } from 'src/app/services/team.service';
import { GroupService } from 'src/app/services/group.service';
import { AlertService } from 'src/app/services/alert.service';
import { LogComponent } from '../../modals/task/log/log.component';

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
  deleteUserGroup = new EventEmitter<User>();

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
  delete: boolean = false;

  isTeamCreator: boolean = false;

  constructor(private userService: UserService,
    private groupService: GroupService,
    private alert: AlertService,
    private teamService: TeamService) {
  }

  ngOnInit(): void {
    if (this.typeString === 'inTheGroup') {
      this.getUsersByGroup()
    } else if (this.typeString === 'creating' || this.typeString === 'permissions' || this.typeString === 'view-infos') {
      this.userService.getUsersByTeam(this.team.id).subscribe((users: User[]) => {
        this.users = users;
      });
    } else if (this.typeString === 'addingParticipants') {
      this.groupService.getUsersOutOfGroup(this.team, this.group).subscribe((users: User[]) => {
        this.users = users;
      });
    }

    this.teamService.getTeamCreator(this.team).subscribe((userC) => {
      if (userC.id === this.userService.getLogged().id) {
        this.isTeamCreator = true
      }
    });

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

  removeUser(user: User): void {
    console.log(user);
    
    this.groupService.deleteUserFromGroup(user, this.team.id, this.group.id)
      .subscribe((group: Group) => {
        this.alert.successAlert(`Usuário retirado do grupo`)
        this.getUsersByGroup()
      },
        e => {
          this.alert.errorAlert('Não foi possível retirar o usuário do grupo ')
        }
      )
  }

  openPermissions(user: User, typeString2: String): void {
    if (typeString2 === 'permissions') {
      user.openPermission = !user.openPermission;
      this.getPermission(user);
    } else {
      user.openInfo = !user.openInfo
    }
  }

  selectPermission(user: User, permission: Permission): void {
    this.teamService.changePermissionEnable(permission, user, this.team).subscribe(
      (permissionRes) => {
        permission.enabled = !permission.enabled;
        this.alert.successAlert('Autorização alterada!')
      })
  }

  getPermission(user: User): Permission[] | any {
    this.teamService.getPermission(this.team, user).subscribe((permissions: Permission[]) => {
      user.permissions = permissions;
    })
  }

  deleteUserTeam(user: User): void {
    this.teamService.deleteUserTeam(this.team, user).subscribe((team: Team) => {
      this.alert.successAlert("Usuário retirado da equipe")
    })
  }

  deleteBoolean(): void {
    this.delete = !this.delete
  }

  @Output()
  deleteEmitterUserTeam: EventEmitter<User> = new EventEmitter<User>();

  deleteEmitUserTeam(user: User): void {
    this.deleteEmitterUserTeam.emit(user);
  }

  deleteEmitUserGroup(user: User): void {
    this.deleteUserGroup.emit(user)
  }

  validatingDelete(user: User, type: boolean): void {
    if (type === true) {
      if (this.typeString === 'inTheGroup') {
        this.removeUser(user)
      } else if (this.typeString === 'permissions') {
        this.deleteEmitUserTeam(user)
      }
    } else {
      this.alert.notificationAlert("Usuário continua na equipe")
    }
  }

  getUsersByGroup(){
    if (this.typeString === 'inTheGroup') {
      this.userService.getUsersByGroup(this.group.id).subscribe((users: User[]) => {
        this.users = users;
      });
    }
  }
}