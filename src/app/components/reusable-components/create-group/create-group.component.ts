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
import { TranslateService } from '@ngx-translate/core';

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
    private groupService: GroupService,
    private translate : TranslateService,) {
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

  pushParticipants(user: any): void {
    this.users.push(user.itemValue);
  }

  @Output()
  emitterNoUsers = new EventEmitter();

  noUsers(event: boolean): void {
    if(event){
      this.emitterNoUsers.emit()
    }
  }

}
