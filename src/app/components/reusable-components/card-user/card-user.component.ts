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
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {

  users: User[] = [];

  name !: String

  @Output()
  userEmitter = new EventEmitter<User>();

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

  delete: boolean = false;

  isTeamCreator : boolean = false;
  isNonCreatorCard : boolean = true;
  @Input()
  user !: User

  @Output()
  noMoreParticipants = new EventEmitter();

  constructor(private userService: UserService,
    private groupService: GroupService,
    private alert: AlertService,
    private teamService: TeamService,
    private router: Router) {
  }

  ngOnInit(): void {
    
    if (this.typeString === 'inTheGroup') {
      this.getUsersByGroup()
    } else if (this.typeString === 'creating' || this.typeString === 'permissions' || this.typeString === 'view-infos') {
      this.user.permissions = this.getPermission(this.user); 
    } else if (this.typeString === 'addingParticipants') {
      this.groupService.getUsersOutOfGroup(this.team, this.group).subscribe((users: User[]) => {
        this.users = users;
        if(this.users.length === 0){
          this.noMoreParticipants.emit();
        }
        
      });
    }


    if(this.user.id! === this.team.creator!.id){
      this.isNonCreatorCard = false
    }
    if (this.team.creator!.id === this.userService.getLogged().id) {
      this.isTeamCreator = true
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
      this.userEmitter.emit(user);
    }
  }



  removeUser(user: User): void {
    this.deleteUserGroup.emit(user);
  }

  selectPermission(user: User, permission: Permission): void {
    this.teamService.changePermissionEnable(permission).subscribe(
      (permissionRes) => {
        permission.enabled = !permission.enabled;
        this.alert.successAlert('Autorização alterada!')
      })
  }

  getPermission(user: User): Permission[] | any {
    this.teamService.getPermission(this.team.id, user.id!).subscribe((permissions: Permission[]) => {
      user.permissions = permissions;
      return user.permissions 
    })
  }


  userToDelete !: User

  deleteBoolean(user: User): void {
    this.delete = !this.delete
    this.userToDelete = user
  }

  deleteUserTeam(event: any): void {
    if (event) {
        this.teamService.getTeamCreator(this.team).subscribe((userC) => {
            if (userC.id === this.userService.getLogged().id) {
                this.teamService.deleteUserTeam(this.team, this.userToDelete).subscribe((team: Team) => {
                    this.alert.successAlert("Usuário retirado da equipe")
                    this.team.users?.splice(this.team.users.indexOf(this.user), 1)
                })
            } else {
                this.alert.errorAlert("Você não pode remover o criador da equipe")
            }
        });
    }
    this.delete = false
}

  deleteEmitUserGroup(user: User): void {
    this.deleteUserGroup.emit(user)
  }

  getUsersByGroup() {
    if (this.typeString === 'inTheGroup') {
      this.userService.getUsersByGroup(this.group.id).subscribe((users: User[]) => {
        this.users = users;
      });
    }
  }

  goToProfile(): void{
    this.router.navigate(["perfil/" + this.user.id]);
  }
}