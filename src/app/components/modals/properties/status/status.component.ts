import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faArrowLeft, faPaintBrush, faTrashCan, faEllipsisVertical,
  faPlus,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Property, PropertyList, PropertyListKind } from 'src/app/models/property';
import { Permission, PermissionsType } from 'src/app/models/user';
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

  canDelete: boolean = false;
  canEdit: boolean = false;

  constructor(private propertyService: PropertyService,
    private alertService: AlertService,
    private projectService: ProjectService,
    private userService: UserService,
    private teamService: TeamService) { }


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

    this.teamService.hasPermission(this.project.id, this.userService.getLogged()).subscribe((permissions: Permission[]) => {
      this.userService.getLogged().permissions = permissions;

      for (const permission of permissions) {
        if (permission.name === PermissionsType.DELETE && permission.enabled) {
          this.canDelete = true;
        } else if (permission.name === PermissionsType.EDIT && permission.enabled) {
          this.canEdit = true;
        }
      }
    })

    this.getPropertiesKind();
  }

  private getPropertiesKind() {
    this.statusList[0].properties = [];
    this.statusList[1].properties = [];
    this.statusList[2].properties = [];
    this.property.propertyLists.forEach((propertyList) => {
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
      this.alertService.errorAlert("Você não tem permissão para alterar o status!")
    }
  }

  drop(event: CdkDragDrop<any[]>, status: any) {
    this.property.propertyLists.forEach((propertyList) => {
      if (propertyList.id == event.item.data.id) {
        propertyList.propertyListKind = status.kind;
      }
    });
    this.saveProperty();
  }


  delete(status: any, propertyList: PropertyList) {
    if (this.canDelete) {
      if (!propertyList.isFixed) {
        this.propertyService.deletePropertyList(this.property.id!, propertyList.id).subscribe(
          (project) => {
            this.project = project;
            this.property = project.properties.find((property) => property.id == this.property.id)!;
            this.getPropertiesKind();
            this.changeProject.emit(this.project);
          })
      }
    } else {
      this.alertService.errorAlert("Você não tem permissão para remover o status!");
    }
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
      this.alertService.notificationAlert('O nome do status deve ter entre 3 e 20 caracteres');
      return;
    }
  }


  editName(propertyList: PropertyList) {
    this.propertyListNameEditId = propertyList.id!;
    this.nameEdit = propertyList.value;
  }

  clickPencil(propertyList: PropertyList) {
    if (this.canEdit) {
      this.pencil.emit(propertyList);
    } else {
      this.alertService.errorAlert("Você não tem permissão para editar o status!")
    }
  }

}