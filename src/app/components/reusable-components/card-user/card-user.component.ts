import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';
import {
  faCircleUser, faSquare, faUserMinus,
  faCaretDown, faCaretUp
} from '@fortawesome/free-solid-svg-icons';
import { PermissionsType, Permission, User, CreatePermission } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Group } from 'src/app/models/groups';
import { TeamService } from 'src/app/services/team.service';
import { GroupService } from 'src/app/services/group.service';
import { AlertService } from 'src/app/services/alert.service';

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

  permissions: Permissions[] = []

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
    } else if (this.typeString === 'creating' || this.typeString === 'permissions') {
      this.userService.getUsersByTeam(this.team.id).subscribe((users: User[]) => {
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
    }
  }

  removeUser(user: User): void {
    this.groupService.deleteUserFromGroup(user, this.team.id, this.group.id)
      .subscribe((group: Group) => {
        this.alert.successAlert(`Usuário retirado do grupo`)
        this.group.users?.splice(this.group.users.indexOf(user), 1);
      },
        e => {
          this.alert.errorAlert('Não foi possível retirar o usuário do grupo ')
        }
      )
  }

  openPermissions(user: User): void {
    user.openPermission = !user.openPermission;
  }

  permissionTypes: Permission[] = [
    { name: PermissionsType.CREATE, label: 'Criar', selected: false },
    { name: PermissionsType.EDIT, label: 'Editar', selected: false },
    { name: PermissionsType.DELETE, label: 'Remover', selected: false },
    { name: PermissionsType.VIEW, label: 'Visualizar', selected: false },
  ]

  selectPermission(user: User, permission: Permission): void {
    let createPermission: CreatePermission = {
      name: permission.name,
      userId: user.id,
      team: {
        id: this.team.id
      }
    }
    this.teamService.permission(createPermission).subscribe(
      (permission) => {
        user.permissions?.push(permission);
        permission.selected = true;
      })
  }
}