import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';
import { faCaretDown, faCaretUp, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { Group } from 'src/app/models/groups';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { GroupService } from 'src/app/services/group.service';

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
    deleteEmitter: EventEmitter<Group> = new EventEmitter<Group>();

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

    @Input()
    user !: User
    
    users: User[] = [];

    constructor(
        private groupService: GroupService
    ){}

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
      this.team = this.group.team;
    }

    deleteEmit(group: Group): void {   
        this.deleteEmitter.emit(group)
    }

}