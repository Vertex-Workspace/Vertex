import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/models/class/task';
import {
  faTrashCan,
  faEnvelope,
  faClockRotateLeft,
  faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
import { Value } from 'src/app/models/class/value';
import { Property, PropertyCreation, PropertyKind, PropertyList } from 'src/app/models/class/property';
import { TeamService } from 'src/app/services/team.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/class/project';
import { UserService } from 'src/app/services/user.service';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { TaskService } from 'src/app/services/task.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';


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



  constructor(private teamService: TeamService,
    private translate : TranslateService,
    private router: Router,
    private taskService: TaskService,
    private alertService: AlertService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  @Input()
  task!: Task;

  @Input()
  project !: Project;

  @Input()
  properties!: Property[] | PropertyCreation[];

  modalDelete: boolean = false;
  @Output() openTaskDetails = new EventEmitter();

  value!: Value;

  @Input() taskList?: Task[]

  @Input() permissions!: Permission[];

  canDelete: boolean = false;
  canEdit: boolean = false;

  icons: any[] = [
    { id: 'delete', icon: this.faTrashCan, disabled: true }
  ];

  ngOnInit(): void {
    if (this.permissions) {
      for (const permission of this.permissions) {
        if ((permission.name === PermissionsType.DELETE) && permission.enabled) {
          this.canDelete = true;
          this.icons[0].disabled = false;
        } else if ((permission.name === PermissionsType.EDIT) && permission.enabled) {
          this.canEdit = true;
        }
      }
    }
  }
  isTaskPage(): boolean {
    return this.router.url.includes("tarefas");
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

  delete(event: any): void {
    this.modalDelete = false;
    if (this.canDelete) {
      if (event) {
        this.taskService.delete(this.task.id).subscribe();
        this.deleteTask.emit(this.task);
      }
    } else {
      this.alertNotPermission();
    }
  }

  openModalDelete(): void {
    if (this.canDelete) {
      this.modalDelete = !this.modalDelete;
    } else {
      this.alertNotPermission();
    }
  }

  alertNotPermission(): void {
    if(!this.canEdit){
      if (this.router.url.includes("home")) {
        this.alertService.errorAlert(this.translate.instant("alerts.error.notPermissionEditTask"))
      } else {
        this.alertService.errorAlert(this.translate.instant("alerts.error.cantEditTask"));
      }
    }
  }

  getColor(value: Value): string {
    if (value.property.kind === PropertyKind.STATUS || value.property.kind === PropertyKind.LIST) {
      let valuePropertyList: PropertyList = value.value as PropertyList;
      if (valuePropertyList != null) {
        return valuePropertyList.color;
      }
    }
    return "";
  }


  @Output() modalTask = new EventEmitter<Task>();
  openModalTask(): void {
    this.modalTask.emit(this.task);
  }
}
