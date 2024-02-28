import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faEllipsisVertical, faPaintBrush, faEye, faEyeSlash,
  faTrashCan, faPlus, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Property, PropertyList, PropertyListKind } from 'src/app/models/property';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { PropertyService } from 'src/app/services/property.service';

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
  pencil = new EventEmitter<PropertyList>();

  faEllipsisVertical = faEllipsisVertical;
  faPaintBrush = faPaintBrush;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faTrashCan = faTrashCan;
  faPlus = faPlus;

  faInfoCircle = faInfoCircle;

  sections: any[] = [
    { name: "Visíveis", icon: faEye, propertyLists: [], kind: PropertyListKind.VISIBLE },
    { name: "Não Visíveis", icon: faEyeSlash, propertyLists: [], kind: PropertyListKind.INVISIBLE }
  ]

  constructor(private propertyService: PropertyService, private alertService: AlertService, private projectService : ProjectService) { }

  ngOnInit(): void {
    console.log(this.property.propertyLists);
    this.orderPropertyListsOnSection();
  }

  private orderPropertyListsOnSection(){
    this.sections[0].propertyLists = [];
    this.sections[1].propertyLists = [];
    this.property.propertyLists!.forEach((propertyList) => {
      if (propertyList.propertyListKind == PropertyListKind.VISIBLE) {
        this.sections[0].propertyLists.push(propertyList);
      } else {
        this.sections[1].propertyLists.push(propertyList);
      }
    });
  }

  eyeVisibility(propertyList: PropertyList) {
    if (propertyList.propertyListKind == PropertyListKind.VISIBLE) {
      this.sections[0].propertyLists.splice(this.sections[0].propertyLists.indexOf(propertyList), 1);
      this.sections[1].propertyLists.push(propertyList);
      propertyList.propertyListKind = PropertyListKind.INVISIBLE;
    } else {
      this.sections[1].propertyLists.splice(this.sections[1].propertyLists.indexOf(propertyList), 1);
      this.sections[0].propertyLists.push(propertyList);
      propertyList.propertyListKind = PropertyListKind.VISIBLE;
    }
    this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
      (property) => {
        this.alertService.successAlert("Visibilidade alterada com sucesso!");
      }, (error) => {
        console.log(error);
      });
  }

  pencilClick(propertyList:PropertyList) {
    this.pencil.emit(propertyList);
  }

  delete(propertyList: PropertyList) {
    console.log(propertyList);
    
    this.propertyService.deletePropertyList(this.property.id!, propertyList.id!).subscribe(
      (project) => {
        this.project = project;
        this.property = project.properties.find((property) => property.id == this.property.id)!;
        this.orderPropertyListsOnSection();
      }, (error) => {
        console.log(error);
      });
  }

  // In this method, it verifies if the index of the list is 1 or 0 to change the position in the correct
  drop(event: CdkDragDrop<PropertyList[]>, section: any) {
    this.property.propertyLists.forEach((propertyList) => {
      if (propertyList.id == event.item.data.id) {
        propertyList.propertyListKind = section.kind;
      }
    });
    this.saveProperty();
  }

  createPropertyList(): void {
    let newPropertyList: PropertyList = { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Novo Item", color: "#d3e5ef", isFixed: false};
    this.property.propertyLists.push(newPropertyList);
    this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
      (project) => {
        this.project = project;
        this.property = project.properties.find((property) => property.id == this.property.id)!;
        this.orderPropertyListsOnSection();
      }, (error) => {
        console.log(error);
      });
  }

  private saveProperty(){
    this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
      (project) => {
        this.project = project;
        this.property = project.properties.find((property) => property.id == this.property.id)!;
        this.orderPropertyListsOnSection();
      }, (error) => {
        console.log(error);
      });
  }


  nameEdit!: string;
  propertyListNameEditId!: number;

  saveName(propertyList : PropertyList){
    if(this.nameEdit.length > 3 && this.nameEdit.length < 20){
      propertyList!.value = this.nameEdit;
      this.saveProperty();
      this.propertyListNameEditId = -1;
      this.nameEdit = '';
    } else{
      this.alertService.notificationAlert('O nome do status deve ter entre 3 e 20 caracteres');
      return;
    }
  }

  editName(propertyList : PropertyList){
    this.propertyListNameEditId = propertyList.id!;
    this.nameEdit = propertyList.value;
  }
}