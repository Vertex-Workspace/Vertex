import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { ProjectService } from 'src/app/services/project.service';
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
    private alertService: AlertService,
    private route: ActivatedRoute,
    private projectService: ProjectService) {

  }
  @Input() task!: Task;
  @Input() width!: string;
  @Input() minHeight!: string;
  @Input() borderColor!: string;
  @Input() project!: Project;

  @Output() deleteTask = new EventEmitter();

  canDelete?: boolean = false;

  ngOnInit(): void {
    //Opacity
    this.borderColor.concat("50");
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.projectService
      .getOneById(id)
      .subscribe((p: Project) => {
        this.project = p;

        this.teamService.hasPermission(id, this.userService.getLogged()).subscribe((permissions: Permission[]) => {
          this.userService.getLogged().permissions = permissions;
    
          for (let i = 0; i < permissions.length; i++) {
            if ((permissions[i].name === PermissionsType.DELETE) && permissions[i].enabled === true) {
              this.canDelete = true;
              this.settings[2].disabled = false;
            }
          }
        });
      })
    
  }

  modalDelete: boolean = false;
  modalDelete2: boolean = false;

  settings = [
    { id: 'clock', icon: this.faClock, onclick: () => this.clock(), disabled: false},
    { id: 'chat', icon: this.faEnvelope, onclick: () => this.openChat(), disabled: false},
    { id: 'delete', icon: this.faTrashCan, onclick: () => this.openModalDelete(), disabled: true }
  ];

  openChat(): void {
  }

  openModalDelete(): void {
    if (this.canDelete) {
      this.modalDelete = true;
    } else {
      this.modalDelete2 = true;
      this.alertService.errorAlert("Você não tem permissão para remover a tarefa!");
      setTimeout(() => {
        this.modalDelete2 = false; 
      }, 1000);
    }
  }

  delete(event: any): void {
    this.modalDelete = false;
    if (event) {
        this.taskService.delete(this.task.id).subscribe(
          (task) => {
            // Alert

            this.deleteTask.emit();
          },
          (error) => {

            // Alert
            console.log(error);
          }
        );
    console.log(event);
    if(event){
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
  }

  clock(): void {
    console.log('clock');
  }

  @Output() openTaskDetails = new EventEmitter();
  openTask(): void {
    if (!this.modalDelete && !this.modalDelete2) {
        this.openTaskDetails.emit();  
    if(!this.modalDelete){
      this.openTaskDetails.emit();
    }
  }
  }

  @Output() current = new EventEmitter();

  takeCurrentTime(): void {
    
  }
}
