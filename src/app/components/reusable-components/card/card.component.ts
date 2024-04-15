import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCircleUser, 
          faTrashCan, 
          faEnvelope, 
          faClockRotateLeft 
        } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/class/task';
import { Project } from 'src/app/models/class/project';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

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
  @Input() permissions!: Permission[];

  @Output() deleteTask = new EventEmitter();

  canDelete?: boolean = false;

  ngOnInit(): void {
    //Opacity
    this.borderColor.concat("50");
    for (const permission of this.permissions) {
      if ((permission.name === PermissionsType.DELETE) && permission.enabled) {
        this.canDelete = true;
        this.settings[2].disabled = false;
      }
    }
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
      console.log('entrei');
      
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
    if (event) {
      
        this.taskService.delete(this.task.id).subscribe(
          (task) => {
            // Alert

            this.deleteTask.emit();
          },
          (error) => {

          }
        );
  }
  this.modalDelete = false;
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
