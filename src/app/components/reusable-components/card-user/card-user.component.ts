import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-card-user',
    templateUrl: './card-user.component.html',
    styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit{

    ngOnInit(): void {
        console.log(this.getUser());
    }

    constructor(
        private userService: UserService
    ){}

    faCircleUser = faCircleUser;

    @Input()
    height?: String;

    @Input()
    width?: String;

    @Input()
    user !: User

    @Input()
    team !: Team

    getUser(): any[]{
         return this.team?.users!;
    
    }
}