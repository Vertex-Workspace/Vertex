import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/models/class/task';
import {
  faTrashCan,
  faEnvelope,
  faClockRotateLeft,
  faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
import { Value } from 'src/app/models/class/value';
import { Property, PropertyCreation, PropertyKind } from 'src/app/models/class/property';
import { TeamService } from 'src/app/services/team.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/class/project';
import { UserService } from 'src/app/services/user.service';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { TaskService } from 'src/app/services/task.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-row-card',
  templateUrl: './row-card.component.html',
  styleUrls: ['./row-card.component.scss']
})
export class RowCardComponent {
  faEllipsisVertical = faEllipsisVertical;
  faClock = faClockRotateLeft;
  faEnvelope = faEnvelope;
  faTrashCan = faTrashCan;

  project !: Project;

  constructor(private teamService: TeamService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private userService: UserService,
    private taskService: TaskService,
    private alertService: AlertService,
    private changeDetection: ChangeDetectorRef
    ) {
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
              this.icons[0].disabled = false;
            } else if ((permissions[i].name === PermissionsType.EDIT) && permissions[i].enabled === true) {
              this.canEdit = true;
            }
          }
        });
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  @Input()
  task!: Task;

  @Input()
  properties!: Property[] | PropertyCreation[];

  modalDelete: boolean = false;
  @Output() openTaskDetails = new EventEmitter();

  value!: Value;

  @Input() taskList ?: Task[]

  canDelete: boolean = false;
  canEdit: boolean = false;

  icons: any[] = [
    // { id: 'clock', icon: this.faClock },
    // { id: 'chat', icon: this.faEnvelope },
    { id: 'delete', icon: this.faTrashCan, disabled: true }
  ];

  ngOnInit(): void {
    
  }

  getPropertyValue(property: Property | PropertyCreation): Value {
    let value: Value;
    this.task.values?.forEach((values: any) => {
      if (property.kind === values.property.kind) {
        value = values;
      }
    });
    return value!;
  }

  @Output() deleteTask = new EventEmitter();
  @Output() deleteTaskOftaskList = new EventEmitter()

  delete(event: any): void {
    console.log(event);
    
    this.modalDelete = false;
    if(event === true){
    if (this.canDelete) {
        if (event) {
          this.taskService.delete(this.task.id).subscribe(
            (task: Task) => {
              this.taskList?.splice(this.taskList.indexOf(task),1)
            },
            (error) => {
              //Alert
              console.log(error);
            }
          );
        }
    } else {
      this.alertService.errorAlert("Você não tem permissão para remover a tarefa!")
    }
  }else {
    this.alertService.notificationAlert("Tarefa não excluída")
  }
  }

  alertCantEdit(): void{
    if(!this.canEdit){
      this.alertService.errorAlert("Você não tem permissão para editar a tarefa!")
    }
  }

  openModalDelete(): void{
    this.modalDelete = !this.modalDelete; 
  }

  propertyColor ?: string

  returnColors(): string | undefined{
    return this.propertyColor
  }

  findNumber(id: any): void {
   this.propertyColor = id;
  }

  @Output() modalTask = new EventEmitter

  openModalTask(): void {
    this.modalTask.emit(this.task);
  }
}
