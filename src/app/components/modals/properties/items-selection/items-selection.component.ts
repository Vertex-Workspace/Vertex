import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faEllipsisVertical, faPaintBrush, faEye, faEyeSlash,
  faTrashCan, faPlus
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

  sections: any[] = [
    { name: "Visíveis", icon: faEye, propertyLists: [] },
    { name: "Não Visíveis", icon: faEyeSlash, propertyLists: [] }
  ]

  constructor(private propertyService: PropertyService, private alertService: AlertService) { }

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
    for(const section of this.sections){
      section.propertyLists.forEach((propertyListFor: PropertyList) => {
        if(propertyList === propertyListFor){
          section.propertyLists.splice(section.propertyLists.indexOf(propertyListFor), 1);
        }
      });
    }
    this.property.propertyLists.splice(this.property.propertyLists.indexOf(propertyList), 1);
    this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
      (property) => {
        this.alertService.successAlert("Propriedade excluída com sucesso!");
      }, (error) => {
        console.log(error);
      });
  }

  // In this method, it verifies if the index of the list is 1 or 0 to change the position in the correct
  drop(event: CdkDragDrop<PropertyList[]>, i: number) {
    if (event.previousContainer.data != event.container.data) {
      //If the previous container is the visible list, the new value of property list
      //Will be invisible
      if (event.previousContainer.data == this.sections[1].propertyLists) {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.sections[0].propertyLists.forEach((propertyList: PropertyList) => {
          if (propertyList.propertyListKind == PropertyListKind.INVISIBLE) {
            propertyList.propertyListKind = PropertyListKind.VISIBLE;
          }
        });
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.sections[1].propertyLists.forEach((propertyList: PropertyList) => {
          if (propertyList.propertyListKind == PropertyListKind.VISIBLE) {
            propertyList.propertyListKind = PropertyListKind.INVISIBLE;
          }
        });
      }
      this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
        (property) => {
          this.alertService.successAlert("Visibilidade alterada com sucesso!");
        }, (error) => {
          console.log(error);
        });
    }
  }

  createPropertyList(): void {
    let newPropertyList: PropertyList = { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Novo Item", color: "#d3e5ef", isFixed: false};
    this.property.propertyLists.push(newPropertyList);
    this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
      (property) => {
        this.sections[0].propertyLists.push(newPropertyList);
        
      }, (error) => {
        console.log(error);
      });
  }

  saveName(propertyListChanged : PropertyList) {
    if(propertyListChanged.value == "") {
      propertyListChanged.value = "Novo Item";
    }
    console.log(this.property);

    
    this.property.propertyLists.forEach((propertyList) => {
      if(propertyList.id == propertyListChanged.id){
        propertyList.value = propertyListChanged.value;
      }
    });
    this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
      (property) => {
        
      },
      (error) => {
        
      }
    );
  }
}