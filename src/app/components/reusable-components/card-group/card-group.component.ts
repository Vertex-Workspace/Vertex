import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';
import { faCaretDown, faCaretUp, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { Group } from 'src/app/models/groups';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
    selector: 'app-card-group',
    templateUrl: './card-group.component.html',
    styleUrls: ['./card-group.component.scss']
})
export class CardGroupComponent{

    faCaretDown = faCaretDown;
    faCaretUp = faCaretUp;
    faTrashCan = faTrashCan;

    @Output()
    close = new EventEmitter<Event>();

    @Output()
    deleteEmitter: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    numberTeam: EventEmitter<number> = new EventEmitter<number>();

    @Input()
    height?: String;

    @Input()
    width?: String;

    @Input()
    team !: Team

    @Input()
    group !: Group

    getGroup(): any[] {
        return this.team?.groups!;
    }

    closeModal() {
        this.close.emit();
    }

    openModal(group: Group): void {
        group.open = !group.open;
    }

    users: User[] = [];
    constructor(private userService: UserService) {}
  
    ngOnInit(): void {
      this.userService.getUsersByGroup(this.group.id).subscribe((users: User[]) => {
        this.users = users;
      });
      this.team = this.group.team;
    }

    deleteEmit(id: number): void {  
        console.log(id);  
        this.deleteEmitter.emit(id)
    }

}