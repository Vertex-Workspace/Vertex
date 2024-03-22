import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/class/team';
import {
  faCaretDown, faCaretUp, faTrashCan,
  faCirclePlus, faComment
} from '@fortawesome/free-solid-svg-icons';
import { Group } from 'src/app/models/class/groups';
import { User } from 'src/app/models/class/user';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { GroupService } from 'src/app/services/group.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.scss']
})
export class CardGroupComponent {

  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faTrashCan = faTrashCan;
  faCirclePlus = faCirclePlus
  faComment = faComment

  @Output()
  close = new EventEmitter<Event>();

  @Input()
  height?: String;

  @Input()
  width?: String;

  @Input()
  team !: Team

  @Input()
  group !: Group

  @Input()
  user !: User

  users: User[] = [];

  selectMoreUsers: boolean = false

  form !: FormGroup

  delete?: boolean

  groupToDelete?: Group

  noUsers ?: boolean

  constructor(
    private groupService: GroupService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService
  ) {
    this.getTeam()
  }

  getGroup(): any[] {
    return this.team?.groups!;
  }

  closeModal() {
    this.close.emit();
  }

  openModal(group: Group): void {
    group.open = !group.open;
  }

  ngOnInit(): void {
    this.getUsesrByGroup()

    this.selectMoreUsers = true
    this.team = this.getTeam();

    this.form = this.formBuilder.group({
      users: [null, this.users]
    })
  }

  getTeam(): Team {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.teamService
      .getOneById(teamId)
      .subscribe((team: Team) => {
        this.team = team;
      })
    return this.team
  }

  addParticipants(): void {
    this.selectMoreUsers = !this.selectMoreUsers
  }

  @Output()
  emitterItem = new EventEmitter<Group>();

  openModalDelete(item: any) {
    this.delete = !this.delete
    this.groupToDelete = item
  }

  userToDelete !: User
  deleteUser?: boolean

  openModalDeleteUser(event: any) {
    this.userToDelete = event
    this.deleteUser = true
  }

  emitItem(event: boolean) {
    if (event) {
      this.emitterItem.emit(this.groupToDelete)
    }
    this.delete = false;
  }

  removeUser(event: boolean): void {
     if (event) {
      this.groupService.deleteUserFromGroup(this.userToDelete, this.team.id, this.group.id)
        .subscribe((group: Group) => {
          this.alertService.successAlert(`Usuário retirado do grupo`)
          this.updateGroup(group)
        },
          e => {
            this.alertService.errorAlert('Não foi possível retirar o usuário do grupo ')
          }
        )
    }
    this.deleteUser = false
  }

  updateGroup(group: Group){
    this.groupService.getGroupById(group.id).subscribe((group:Group) => {
      this.group = group;
    })
  }

  getUsesrByGroup(){
    for (const group of this.getGroup()) {
      this.userService.getUsersByGroup(group.id).subscribe((users: User[]) => {
        group.users = users;
      });
    }
  }

}