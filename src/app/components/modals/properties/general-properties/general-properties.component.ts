import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faArrowLeft, faXmark, faEye, faGear,
  faTrashCan, faEyeSlash, faEllipsisVertical,
  faFont, faCalendarDays, faPlus, faSpinner, faCaretDown, fa1, faListNumeric, faList
} from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, CdkDropList, moveItemInArray, CdkDrag, transferArrayItem } from '@angular/cdk/drag-drop';
import { Property, PropertyKind, PropertyListKind, PropertyStatus } from 'src/app/models/class/property';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/class/project';
import { PropertyService } from 'src/app/services/property.service';
import { AlertService } from 'src/app/services/alert.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-general-properties',
  templateUrl: './general-properties.component.html',
  styleUrls: ['./general-properties.component.scss']
})
export class GeneralPropertiesComponent {
  faArrowLeft = faArrowLeft;
  faXmark = faXmark;
  faEye = faEye;
  faGear = faGear;
  faTrashCan = faTrashCan;
  faEyeSlash = faEyeSlash;
  faEllipsisVertical = faEllipsisVertical;
  faFont = faFont;
  faCalendarDays = faCalendarDays;
  faPlus = faPlus;
  faSpinner = faSpinner;

  currentModal: string = 'general';
  generalModal: boolean = true;
  deleteBoolean: boolean = false;

  @Output()
  openNewProperty = new EventEmitter<Property>();

  @Output()
  close = new EventEmitter();

  @Input()
  height?: String;

  @Input()
  width?: String;


  @Output()
  edit = new EventEmitter();

  @Output()
  select = new EventEmitter();

  @Output()
  status = new EventEmitter<Property>();

  @Output()
  changeProject = new EventEmitter<Project>();

  @Input()
  project!: Project;

  propertyToDelete !: Property

  @Input()
  canCreate: boolean = false;
  @Input()
  canDelete: boolean = false;
  @Input()
  canEdit: boolean = false;

  propertiesList: any[] = [
    {
      status: 'Visíveis',
      opacity: false,
      icon: faEye,
      properties: [],
      kind: PropertyListKind.VISIBLE
    },
    {
      status: 'Não visíveis',
      opacity: true,
      icon: faEyeSlash,
      properties: [],
      kind: PropertyListKind.INVISIBLE
    }
  ]

  constructor(private propertyService: PropertyService,
    private alertService: AlertService,
    private translate : TranslateService) { }

  ngOnInit(): void {
    this.separePropertiesKind();
  }

  private separePropertiesKind() {
    this.propertiesList[0].properties = [];
    this.propertiesList[1].properties = [];
    this.project.properties.forEach(
      (property) => {
        // [0] - VISIBLE, [1] - INVISIBLE
        if (property.propertyStatus === PropertyStatus.VISIBLE) {
          this.propertiesList[0].properties.push(property);
        } else if (property.propertyStatus === PropertyStatus.INVISIBLE) {
          this.propertiesList[1].properties.push(property);
        }
      });
  }

  closeModal() {
    this.close.emit();
  }

  createProperty() {
    //BUROCRACY, THE BACK END DOESN'T NEED THIS TO CREATE A DEFAULT PROPERTY
    if (this.canCreate) {
      let genericProperty = new Property({
        id: 0,
        name: '',
        kind: PropertyKind.TEXT,
        propertyStatus: PropertyStatus.VISIBLE,
        propertyLists: [],
      });
      this.openNewProperty.emit(genericProperty);
    } else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.permissionDeniedPropertyCreation"));
    }
  }

  editProperty(property: Property, type: string) {
    if (property.kind === PropertyKind.STATUS) {
      this.status.emit(property);
    } else if (property.kind == PropertyKind.LIST && type == 'row') {
      this.select.emit(property);
    }
    else if (property.kind === PropertyKind.DATE) {
      //Alert or message
    } else {
      if (this.canEdit) {
        this.edit.emit(property);
      } else {
        this.alertService.errorAlert(this.translate.instant("alerts.error.permission_to_edit_properties"))
      }
    }
  }

  changeStatus(property: Property) {
    if(this.canEdit){
      if (property.propertyStatus === PropertyStatus.VISIBLE) {
        property.propertyStatus = PropertyStatus.INVISIBLE;
      } else {
        property.propertyStatus = PropertyStatus.VISIBLE;
      }
      this.propertyService.createOrEditProperty(this.project.id!, property).subscribe(
        (project) => {
          this.project = project;
          this.separePropertiesKind();
          this.changeProject.emit(this.project);
        }, (error) => {
          console.log(error);
        });
    } else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.permission_to_edit_properties"));
    }
  }

  delete(event: boolean) {
    if (event) {
      if (this.canDelete) {
        this.propertyService.deleteProperty(this.project.id!, this.propertyToDelete.id).subscribe(
          (project) => {
            this.project = project
            this.separePropertiesKind();
            this.changeProject.emit(this.project);
          }, (error) => {
            console.log(error);
          });
      } else {
        this.alertService.errorAlert(this.translate.instant("alerts.error.permission_to_remove_properties"))
      }
    }
    this.deleteBoolean = false
  }

  getIconProperty(kindProperty: PropertyKind): any {
    if (kindProperty === PropertyKind.TEXT) {
      return faFont;
    } else if (kindProperty === PropertyKind.DATE) {
      return faCalendarDays;
    } else if (kindProperty === PropertyKind.STATUS) {
      return faSpinner;
    } else if (kindProperty === PropertyKind.LIST) {
      return faList;
    } else if (kindProperty === PropertyKind.NUMBER) {
      return fa1;
    }

  }

  openModalDelete(property: Property) {
    if(this.canDelete){
      this.deleteBoolean = !this.deleteBoolean
      this.propertyToDelete = property
    } else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.permission_to_remove_properties"));
    }
  }
}

