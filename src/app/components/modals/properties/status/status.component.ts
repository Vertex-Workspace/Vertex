import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faArrowLeft, faPaintBrush, faTrashCan, faEllipsisVertical,
  faPlus,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/models/class/project';
import { Property, PropertyList, PropertyListKind } from 'src/app/models/class/property';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { colors } from 'src/app/models/colors';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { PropertyService } from 'src/app/services/property.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  faArrowLeft = faArrowLeft;
  faPaintBrush = faPaintBrush;
  faTrashCan = faTrashCan;
  faEllipsisVertical = faEllipsisVertical;
  faPlus = faPlus;
  colorModal: boolean = false

  faInfoCircle = faInfoCircle;

  @Output()
  pencil = new EventEmitter<PropertyList>();

  @Output()
  changeProject = new EventEmitter<Project>();


  @Input()
  project!: Project;

  @Input()
  property!: Property;

  @Input()
  canDelete: boolean = false;
  @Input()
  canEdit: boolean = false;
  @Input()
  canCreate: boolean = false;

  deleteBoolean: boolean = false;

  propertyListToDelete !: PropertyList

  constructor(private propertyService: PropertyService,
    private alertService: AlertService,
    private projectService: ProjectService,
    private userService: UserService,
    private teamService: TeamService,
    private translate : TranslateService) { }


  statusList: any[] = [
    {
      kind: PropertyListKind.TODO,
      name: 'Não iniciado',
      color: "#ffe2dd",
      properties: []
    },
    {
      kind: PropertyListKind.DOING,
      name: 'Em andamento',
      color: "#fdecc8",
      properties: []
    },
    {
      kind: PropertyListKind.DONE,
      name: 'Concluída',
      color: "#dbeddb",
      properties: []
    }
  ]

  initialProperty!: Property;
  ngOnInit(): void {
    //Manually copy the object
    this.initialProperty = {
      id: this.property.id,
      name: this.property.name,
      propertyLists: this.property.propertyLists,
      propertyStatus: this.property.propertyStatus,
      kind: this.property.kind
    };

    this.getPropertiesKind();
  }

  private getPropertiesKind() {
    this.statusList[0].properties = [];
    this.statusList[1].properties = [];
    this.statusList[2].properties = [];
    this.property.propertyLists.forEach((propertyList: { propertyListKind: any; }) => {
      if (propertyList.propertyListKind == PropertyListKind.TODO) {
        this.statusList[0].properties.push(propertyList);
      } else if (propertyList.propertyListKind == PropertyListKind.DOING) {
        this.statusList[1].properties.push(propertyList);
      } else if (propertyList.propertyListKind == PropertyListKind.DONE) {
        this.statusList[2].properties.push(propertyList);
      }
    });
  }

  add(status: any) {
    if (this.canEdit) {
      let newPropertyList: PropertyList = {
        id: 0,
        value: status.name,
        color: status.color,
        propertyListKind: status.kind,
        isFixed: false
      };
      this.property.propertyLists.push(newPropertyList);
      status.properties.push(newPropertyList);

      this.saveProperty();
    } else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantCreateMoreStatus"))
    }
  }

  drop(event: CdkDragDrop<any[]>, status: any) {
    this.property.propertyLists.forEach((propertyList: { id: any; propertyListKind: any; }) => {
      if (propertyList.id == event.item.data.id) {
        propertyList.propertyListKind = status.kind;
      }
    });
    this.saveProperty();
  }


  delete(event: any) {
    if (event) {
      if (this.canDelete) {
        if (!this.propertyListToDelete.isFixed) {
          this.propertyService.deletePropertyList(this.property.id!, this.propertyListToDelete.id).subscribe(
            (project) => {
              this.project = project;
              this.property = project.properties.find((property) => property.id == this.property.id)!;
              this.getPropertiesKind();
              this.changeProject.emit(this.project);
            })
        }
      } else {
        this.alertService.errorAlert(this.translate.instant("alerts.error.cantDeleteStatus"));
      }
    }
    this.deleteBoolean = false;
  }

  nameEdit!: string;
  propertyListNameEditId!: number;

  private saveProperty() {
    this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
      (project) => {
        this.project = project;
        this.property = project.properties.find((property) => property.id == this.property.id)!;
        this.getPropertiesKind();
        this.changeProject.emit(this.project);
      },
      (error) => {

      }
    );
  }
  saveName(propertyList: PropertyList) {
    if (this.nameEdit.length > 2 && this.nameEdit.length <= 20) {
      propertyList!.value = this.nameEdit;
      this.saveProperty();
      this.propertyListNameEditId = -1;
      this.nameEdit = '';
    } else {
      this.alertService.notificationAlert(this.translate.instant("alerts.notification.nameLength"));
      return;
    }
  }

  getStrongerColor(colorReceived: string): string | undefined {
    const matchingColor = colors.find(color => color.weak === colorReceived);
    return matchingColor ? matchingColor.text : undefined;
  } 


  editName(propertyList: PropertyList) {
    if(this.canEdit){
    this.propertyListNameEditId = propertyList.id!;
    this.nameEdit = propertyList.value;
    }else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantEdit"));
    }
  }

  clickPencil(propertyList: PropertyList) {
    if (this.canEdit) {
      this.pencil.emit(propertyList);
    } else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantEditStatus"))
    }
  }

  openModalDelete(property: PropertyList): void {
    if(this.canDelete && !property.isFixed){
      this.deleteBoolean = !this.deleteBoolean
      this.propertyListToDelete = property
    } else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantDeleteStatus"));
    }
  }
}