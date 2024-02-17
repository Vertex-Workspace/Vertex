import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faCircleUser,
  faTrashCan,
  faEnvelope,
  faClockRotateLeft
} from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/task';
import { Permission, PermissionsType } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  faCircleUser = faCircleUser;
  faEnvelope = faEnvelope;
  faTrashCan = faTrashCan;
  faClock = faClockRotateLeft;

  constructor(private taskService: TaskService,
    private teamService: TeamService,
    private userService: UserService,
    private alertService: AlertService) {

  }
  @Input() task !: Task;
  @Input() width!: string;
  @Input() minHeight!: string;
  @Input() borderColor!: string;
  @Input() project !: Project

  @Output() deleteTask = new EventEmitter();

  canDelete?: boolean = false

  ngOnInit(): void {
    //Opacity
    this.borderColor = this.borderColor.substring(0, this.borderColor.length - 2);;
    this.teamService.hasPermission(this.project, this.userService.getLogged()).subscribe((permissions: Permission[]) => {
      this.userService.getLogged().permissions = permissions;
      this.settings[2].disabled = true

      for (let i = 0; i < permissions.length; i++) {
        if ((permissions[i].name === PermissionsType.DELETE) && permissions[i].enabled === true) {
          this.canDelete = true;
          this.settings[2].disabled = false
        }
      }
    })
    console.log(this.canDelete);
  }

  modalDelete: boolean = false;


  settings = [
    { id: 'clock', icon: this.faClock, onclick: () => this.clock(), disabled: false},
    { id: 'chat', icon: this.faEnvelope, onclick: () => this.openChat(), disabled: false},
    { id: 'delete', icon: this.faTrashCan, onclick: () => this.openModalDelete(), disabled: true }
  ];

  openChat(): void {
    console.log('open chat');
    console.log(this.borderColor);
  }

  openModalDelete(): void {
    if(this.canDelete){
      this.modalDelete = true;
    }else{
      this.alertService.errorAlert("No remove")
    }
  }

  delete(event: any): void {
    this.modalDelete = false;
    if (event) {
        this.taskService.delete(this.task.id).subscribe(
          (task) => {
            //Alert

            this.deleteTask.emit();
          },
          (error) => {

            //Alert
            console.log(error);
          }
        );
    }
  }

  clock(): void {
    console.log('clock');
  }

  @Output() openTaskDetails = new EventEmitter();
  openTask(): void {
    if (!this.modalDelete) {
      this.openTaskDetails.emit();
    }
  }

  dale(): void {
    console.log('dale');
  }


}

