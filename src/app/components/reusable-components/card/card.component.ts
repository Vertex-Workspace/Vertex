import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCircleUser, 
          faTrashCan, 
          faEnvelope, 
          faClockRotateLeft 
        } from '@fortawesome/free-solid-svg-icons';
import { Task, TaskEdit } from 'src/app/models/class/task';
import { Project } from 'src/app/models/class/project';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { colors } from 'src/app/models/colors';
import { TranslateService } from '@ngx-translate/core';

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
    private alertService: AlertService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private router : Router,
    private translate: TranslateService) {
  }
  @Input() task!: Task;
  @Input() width!: string;
  @Input() minHeight!: string;
  @Input() borderColor!: string;
  @Input() project!: Project;
  @Input() permissions!: Permission[];
  @Input() hasTrash: boolean=true;

  @Output() deleteTask = new EventEmitter();

  canDelete?: boolean = false;
  canEdit?: boolean = false;
  ngOnChanges(): void {   
    colors.forEach(color => {
      if (color.weak === this.borderColor) {
        this.borderColor = color.strong;
      }
    });
  }

  ngOnInit(): void {
    //Opacity
    colors.forEach(color => {
      if (color.weak === this.borderColor) {
        this.borderColor = color.strong;
      }
    });
    if (this.permissions) {
      for (const permission of this.permissions) {
        if ((permission.name === PermissionsType.DELETE) && permission.enabled) {
          this.canDelete = true;
          this.settings[0].disabled = false;
        }
        if ((permission.name === PermissionsType.EDIT) && permission.enabled) {
          this.canEdit = true;
        }
      }
    }
  }

  modalDelete: boolean = false;
  modalDelete2: boolean = false;

  settings = [
    { id: 'delete', icon: this.faTrashCan, onclick: () => this.openModalDelete(), disabled: true }
  ];

  openChat(): void {
  }

  openModalDelete(): void {
    if (this.canDelete) {
      console.log(this.task);
      
      this.deleteTask.emit(this.task);
    } else {
      this.modalDelete2 = true;
      this.alertService.errorAlert(this.translate.instant('alerts.error.cantDeleteTask'));
      setTimeout(() => {
        this.modalDelete2 = false; 
      }, 1000);
    }
  }

  openInputName: boolean = false;
  saveLastName: string = "";
  openModalEdit() {
    if(this.canEdit || this.router.url.includes('landing-page')){
      this.openInputName = !this.openInputName;
      this.saveLastName = this.task.name;
    }
  }

  editName(): void{
    if(!this.hasTrash){
      return;
    }
    if(this.task.name.length < 4){
      this.alertService.errorAlert(this.translate.instant('alerts.error.minTaskLengthName'));
      this.task.name = this.saveLastName;
      return;
    }
    const taskEdit : TaskEdit = {
      id: this.task.id,
      name: this.task.name,
      description: this.task.description
    }
    this.taskService.edit(taskEdit).subscribe(
      (task) => {
        this.openInputName = false;
      },
      (error) => {
        this.alertService.errorAlert(this.translate.instant('alerts.error.errorEditingTask'));
      }
    );
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
}
