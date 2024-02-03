import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class CreateGroupComponent implements OnInit{

  form !: FormGroup;

  team !: Team

  users : User []=[];

  @Output()
  createGroup = new EventEmitter<Group>()

  @Output()
  close = new EventEmitter();

  constructor( private formBuilder: FormBuilder,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private userService: UserService){  
    this.getTeam();
    this.users;
  }

  ngOnInit(): void {
    this.userService.getUsersByTeam(this.team.id).subscribe((users: User[]) => {
      this.users = users;
    });
    
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      team: [this.team],
      users: [this.users]
    })
  }

  onSubmit(): void {
    console.log(this.users);
    
    const group = this.form.getRawValue() as Group
    group.team = this.team
    this.createGroup.emit(group);
  }

  getTeam(): void{
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.teamService
      .getOneById(teamId)
      .subscribe((team: Team) => {
        this.team = team;
        console.log(this.team);
      }) 
  }

  selectUsers(user : User): User[]{
    console.log(user);
    this.users.push(user);

    return this.users;
  }

  closeGroup(){
    this.close.emit()
  }

}
