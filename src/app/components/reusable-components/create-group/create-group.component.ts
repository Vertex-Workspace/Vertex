import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from 'src/app/models/groups';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  form !: FormGroup;

  @Input()
  team !: Team

  users: User[] = [];

  @Output()
  createGroup = new EventEmitter<Group>()

  @Output()
  close = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.getTeam();
  }

  ngOnInit(): void {
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

}
