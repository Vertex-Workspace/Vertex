import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/groups';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-groups-select',
  templateUrl: './groups-select.component.html',
  styleUrls: ['./groups-select.component.scss']
})
export class GroupsSelectComponent{

  groups: Group[] = [];

  constructor(private groupService: GroupService) { 
    this.groupService.getGroupsByTeam(1).subscribe({
      next: (groups) => {
        this.groups = groups;
        console.log(this.groups);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  
  getGroupById(group:Group): void {
    if(!group.open){
      this.groupService.getGroupById(group.id).subscribe({
        next: (group) => {
          group.users = group.users;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    group.open = !group.open;
  }
}
