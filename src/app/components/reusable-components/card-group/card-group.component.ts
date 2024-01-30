import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';

@Component({
    selector: 'app-card-group',
    templateUrl: './card-group.component.html',
    styleUrls: ['./card-group.component.scss']
})
export class CardGroupComponent {

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
}