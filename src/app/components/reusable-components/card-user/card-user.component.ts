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

  permissions: Permission[] = []
  permission!: PermissionsType;

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
    this.getPermission(user);
  }

  // permissionTypes: Permission[] = [
  //   { name: PermissionsType.CREATE, label: 'Criar', selected: false },
  //   { name: PermissionsType.EDIT, label: 'Editar', selected: false },
  //   { name: PermissionsType.DELETE, label: 'Remover', selected: false },
  //   { name: PermissionsType.VIEW, label: 'Visualizar', selected: false },
  // ]

  selectPermission(user: User, permissionName: String): void {
    if(permissionName === 'Criar') {
      this.permission = PermissionsType.CREATE
    } else if(permissionName === 'Editar') {
      this.permission = PermissionsType.EDIT
    } else if(permissionName === 'Remover') {
      this.permission = PermissionsType.DELETE
    } else if(permissionName === 'Visualizar') {
      this.permission = PermissionsType.VIEW
    }

    let createPermission: CreatePermission = {
      name: this.permission,
      userId: user.id,
      team: {
        id: this.team.id
      },
      selected: true
    }

    this.teamService.permission(createPermission).subscribe(
      (permission) => {
        permission.selected = true;
        user.permissions?.push(permission);
        permission.selected = true;
      })
    }

      getPermission(user: User): void {
        this.teamService.getPermission(this.team, user).subscribe((permissions: Permission[]) => {
          user.permissions = permissions;
          console.log(user.permissions);
          const hasCreatePermission = user.permissions.some(permission => permission.name === PermissionsType.CREATE);
          user.hasCreatePermission = hasCreatePermission;
          const hasEditPermission = user.permissions.some(permission => permission.name === PermissionsType.EDIT);
          user.hasEditPermission = hasEditPermission;
          const hasDeletePermission = user.permissions.some(permission => permission.name === PermissionsType.DELETE);
          user.hasDeletePermission = hasDeletePermission;
          const hasViewPermission = user.permissions.some(permission => permission.name === PermissionsType.VIEW);
          user.hasViewPermission = hasViewPermission;
          
          
        })
        console.log(user.permissions);
        
      }

}