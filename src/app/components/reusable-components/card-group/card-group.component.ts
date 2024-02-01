import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';
import { faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons';
import { Group } from 'src/app/models/groups';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-card-group',
    templateUrl: './card-group.component.html',
    styleUrls: ['./card-group.component.scss']
})
export class CardGroupComponent {

    faCaretDown = faCaretDown;
    faCaretUp = faCaretUp;

    @Output()
    close = new EventEmitter<Event>();

    @Input()
    height?: String;

    @Input()
    width?: String;

    @Input()
    team !: Team

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
      this.userService.getAll().subscribe((users: User[]) => {
        this.users = users;
      });
    }

}