import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/class/team';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Group } from 'src/app/models/class/groups';
import { User } from 'src/app/models/class/user';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { GroupService } from 'src/app/services/group.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'jquery';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.scss']
})
export class CardGroupComponent {

  faTrashCan = faTrashCan;

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

  form !: FormGroup

  delete?: boolean

  groupToDelete!: Group
  render : boolean = false;
  noUsers?: boolean
  placeholder: string = "Membros do grupo";
  constructor(
    private groupService: GroupService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService,
    private translate : TranslateService
  ) {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.teamService
      .getOneById(teamId)
      .subscribe((team: Team) => {
        this.team = team;
        this.usersTeam = this.team.users!
        for (const ug of this.group.userTeams!) {
          if(this.selectedUsers.length === 0){
            this.placeholder = ug.user!.firstName;
          }
          this.selectedUsers.push(ug.user!)
        }
        this.render = true;
      })
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
  }

  getTeam(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.teamService
      .getOneById(teamId)
      .subscribe((team: Team) => {
        this.team = team;
      })
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

  emitItem(event: any) {
    if (event) {  
      this.emitterItem.emit(this.groupToDelete)
    }
    this.delete = false;
  }

  removeUser(event: boolean): void {
    if (event) {
      this.groupService.deleteUserFromGroup(this.userToDelete, this.team.id, this.group.id)
        .subscribe((group: Group) => {
          this.updateGroup(group)
        },
          e => {
            this.alertService.errorAlert(this.translate.instant('alerts.error.cantRemoveUserFromGroup'))
          }
        )
    }
    this.deleteUser = false
  }

  updateGroup(group: Group) {
    this.groupService.getGroupById(group.id).subscribe((group: Group) => {
      this.group = group;
    })
  }

  usersTeam: User[] = []
  selectedUsers: User[] = []



  deleted: boolean = false
  //user: User, teamId:number, groupId:number
  addOrDelete(event: any, group: Group) {
    console.log(group);
    console.log(event.value);
    
    if(group.userTeams!.find(u => u.user.id === event.itemValue.id)) {
      this.groupService.deleteUserFromGroup(event.itemValue, this.team.id, group.id).subscribe((group: Group) => {
        this.group.userTeams = event.value;
      })
    } else {
      this.groupService.addParticipants(group, event.itemValue.id).subscribe((group: Group) => {
        this.group.userTeams = event.value;
      });
    }
  }

  input: boolean = false
  nameEdit !: string
  editGroupName(){
    this.input = !this.input
  }

  edit(group: Group){  
    this.groupService.edit(group, this.team.id).subscribe((group1: Group) => {
      this.alertService.successAlert(this.translate.instant('alerts.success.editedGroup')) 
    })
    this.input = !this.input
  }
}