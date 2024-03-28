import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from 'src/app/models/class/groups';
import { Team } from 'src/app/models/class/team';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/class/user';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { GroupService } from 'src/app/services/group.service';
import { taskHourService } from 'src/app/services/taskHour.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  form !: FormGroup;

  modalCopyLink: boolean = false;

  @Input()
  team !: Team

  @Input()
  group !: Group

  users: User[] = [];

  @Input()
  typeString !: string

  @Output()
  createGroup = new EventEmitter<Group>()

  @Output()
  close = new EventEmitter();

  usersToSelect ?: User[]

  constructor(private formBuilder: FormBuilder,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private groupService: GroupService) {
    this.getTeam();
  }

  ngOnInit(): void {
    this.usersToSelect = this.team.users
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      team: [this.team],
      users: [this.users]
    })
  }

  onSubmit(): void {
    const group = this.form.getRawValue() as Group
    group.team = this.team
    group.users = this.users
    this.createGroup.emit(group);
  }

  getTeam(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.teamService
      .getOneById(teamId)
      .subscribe((team: Team) => {
        this.team = team;
      })
  }

  selectUsers(user: User): void {
    if (user.selected) {
      this.users.push(user);
    }
  }

  closeGroup() {
    this.close.emit()
  }

  closeScreen(): void {
    this.close.emit();
  }

  confirmCreateTeam(): void {
    //validations

    this.modalCopyLink = true;
  }

  copyLink(): void {
    //copiar para a area de transferência
    this.closeScreen();
  }

  // addParticipants(): void {
  //   this.selectMoreUsers = !this.selectMoreUsers
  // }

  pushParticipants(user: User): void {
    this.users.push(user)
    console.log(user);

  }

  onSubmit2(group: Group): void {
    console.log("entrei");
    this.groupService.getGroupById(group.id).subscribe((group: Group) => {
      this.group = group;
    });
    group.users = this.users;

    // this.groupService
    //   .addParticipants(group)
    //   .subscribe((group: Group) => {
    //     //calls addPartcipants to back to normal state of card
    //     // this.addParticipants();
    //     this.alertService.successAlert("adicionado")
    //   },
    //     e => {
    //       this.alertService.errorAlert("erro")
    //     });
    //     this.closeGroup()
  }


  @Output()
  emitterNoUsers = new EventEmitter();

  noUsers(event: boolean): void {
    if(event){
      this.emitterNoUsers.emit()
    }
  }

}
