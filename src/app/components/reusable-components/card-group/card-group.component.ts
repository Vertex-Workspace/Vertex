import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';
import { faCaretDown, faCaretUp, faTrashCan, faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { Group } from 'src/app/models/groups';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { GroupService } from 'src/app/services/group.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-card-group',
    templateUrl: './card-group.component.html',
    styleUrls: ['./card-group.component.scss']
})
export class CardGroupComponent{

    faCaretDown = faCaretDown;
    faCaretUp = faCaretUp;
    faTrashCan = faTrashCan;
    faCirclePlus = faCirclePlus

    @Output()
    close = new EventEmitter<Event>();

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

    selectMoreUsers: boolean = false

    form !: FormGroup

    delete ?: boolean

    groupToDelete ?: Group

    constructor(
        private groupService: GroupService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private teamService: TeamService
    ){
      this.getTeam()
    }

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
      this.selectMoreUsers = true
      this.team = this.getTeam();
      console.log(this.team);
    
      this.form = this.formBuilder.group({
        users:[null, this.users]
      })
    }

    getTeam(): Team {
      const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
  
      this.teamService
        .getOneById(teamId)
        .subscribe((team: Team) => {
          this.team = team;
        })
      return this.team
    }

    addParticipants(): void{
      this.selectMoreUsers = !this.selectMoreUsers
    }

    pushParticipants(user: User): void {
      this.users.push(user)
    }
    
    onSubmit(group: Group): void {
      console.log("entrei");
      this.groupService.getGroupById(group.id).subscribe((group: Group) => {
        this.group = group;
      });
        group.users = this.users;
        console.log(group);
        
        this.groupService
        .addParticipants(group)
        .subscribe((group: Group) => {
          //calls addPartcipants to back to normal state of card
          this.addParticipants();
          this.alertService.successAlert("Usuário adicionado")
        },
          e => {
            this.alertService.errorAlert("erro")
        });
    }

    @Output()
    emitterItem = new EventEmitter<Group>();
  
    openModalDelete(item:any){
      this.delete = !this.delete
      this.groupToDelete = item  
    }
  
    emitItem(){
      this.emitterItem.emit(this.groupToDelete)
      this.delete = false;
    }

    
}