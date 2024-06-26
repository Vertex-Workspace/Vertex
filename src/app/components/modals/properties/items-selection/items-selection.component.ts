import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faEllipsisVertical, faPaintBrush, faEye, faEyeSlash,
  faTrashCan, faPlus, faInfoCircle
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
  selector: 'app-items-selection',
  templateUrl: './items-selection.component.html',
  styleUrls: ['./items-selection.component.scss']
})
export class ItemsSelectionComponent {

  @Input()
  property!: Property;

  @Input()
  project!: Project;

  @Output()
  changeProject = new EventEmitter<Project>();

  @Output()
  pencil = new EventEmitter<PropertyList>();

  propertyListToDelete !: PropertyList

  deleteBoolean: boolean = false;

  faEllipsisVertical = faEllipsisVertical;
  faPaintBrush = faPaintBrush;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faTrashCan = faTrashCan;
  faPlus = faPlus;

  faInfoCircle = faInfoCircle;
  @Input()
  canDelete: boolean = false;
  @Input()
  canEdit: boolean = false;
  @Input()
  canCreate: boolean = false;

  sections: any[] = [
    { name: "Visíveis", icon: faEye, propertyLists: [], kind: PropertyListKind.VISIBLE },
    { name: "Não Visíveis", icon: faEyeSlash, propertyLists: [], kind: PropertyListKind.INVISIBLE }
  ]

  constructor(private propertyService: PropertyService, 
    private alertService: AlertService,
    private translate : TranslateService) { }

  ngOnInit(): void {
    this.orderPropertyListsOnSection();
  }

  private orderPropertyListsOnSection() {
    this.sections[0].propertyLists = [];
    this.sections[1].propertyLists = [];
    this.property.propertyLists!.forEach((propertyList: { propertyListKind: any; }) => {
      if (propertyList.propertyListKind == PropertyListKind.VISIBLE) {
        this.sections[0].propertyLists.push(propertyList);
      } else {
        this.sections[1].propertyLists.push(propertyList);
      }
    });
  }

  eyeVisibility(propertyList: PropertyList) {
    if(this.canEdit){
      if (propertyList.propertyListKind == PropertyListKind.VISIBLE) {
        this.sections[0].propertyLists.splice(this.sections[0].propertyLists.indexOf(propertyList), 1);
        this.sections[1].propertyLists.push(propertyList);
        propertyList.propertyListKind = PropertyListKind.INVISIBLE;
      } else {
        this.sections[1].propertyLists.splice(this.sections[1].propertyLists.indexOf(propertyList), 1);
        this.sections[0].propertyLists.push(propertyList);
        propertyList.propertyListKind = PropertyListKind.VISIBLE;
      }
      this.saveProperty();
    } else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantEdit"));
    }
  }

  pencilClick(propertyList: PropertyList) {
    if(this.canEdit){
      this.pencil.emit(propertyList);
    } else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantEdit"));
    }
  }

  delete(event: any) {
    if (event) {
      this.propertyService.deletePropertyList(this.property.id!, this.propertyListToDelete.id!).subscribe(
        (project) => {
          this.project = project;
          this.property = project.properties.find((property) => property.id == this.property.id)!;
          this.changeProject.emit(project);
          this.orderPropertyListsOnSection();
        });
    }
    this.deleteBoolean = false;
  }

  getStrongerColor(colorReceived: string): string | undefined {
    const matchingColor = colors.find(color => color.weak === colorReceived);
    return matchingColor ? matchingColor.text : undefined;
  } 

  // In this method, it verifies if the index of the list is 1 or 0 to change the position in the correct
  // drop(event: CdkDragDrop<PropertyList[]>, section: any) {
  //   this.property.propertyLists.forEach((propertyList) => {
  //     if (propertyList.id == event.item.data.id) {
  //       propertyList.propertyListKind = section.kind;
  //     }
  //   });
  //   this.saveProperty();
  // }

  createPropertyList(): void {
    let newPropertyList: PropertyList = { id: 0, value: "Novo Item", color: "#d3e5ef", propertyListKind: PropertyListKind.VISIBLE, isFixed: false };
    if(this.canCreate){
    this.property.propertyLists.push(newPropertyList);
    this.saveProperty();
    }else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantCreate"));
    }
  }

  private saveProperty() {
    this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
      (project) => {
        this.project = project;
        this.property = project.properties.find((property) => property.id == this.property.id)!;
        this.orderPropertyListsOnSection();
        this.changeProject.emit(project);
      });

  }


  nameEdit!: string;
  propertyListNameEditId!: number;

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

  editName(propertyList: PropertyList) {
    console.log(propertyList);

    if(this.canEdit){
    this.propertyListNameEditId = propertyList.id!;
    this.nameEdit = propertyList.value;
    }else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantEdit"));
    }
  }

  openModalDelete(property: PropertyList): void {
    if(this.canDelete){
      this.deleteBoolean = !this.deleteBoolean
      this.propertyListToDelete = property
    } else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantDeleteStatus"));
    }
  }
}