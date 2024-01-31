import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';
import { faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons';
import { Group } from 'src/app/models/groups';

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
    title?: String;

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
}