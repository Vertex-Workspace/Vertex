import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from 'src/app/models/groups';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit{

  form !: FormGroup;

  team !: Team

  @Output()
  createGroup = new EventEmitter<Group>()

  constructor( private formBuilder: FormBuilder,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router){  
    this.getTeam();
  }

  ngOnInit(): void {
    console.log(this.team);
    
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      team: [this.team]
    })
  }

  onSubmit(): void {
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

}
