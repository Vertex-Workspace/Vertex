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
  pencil = new EventEmitter();

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

  constructor(private projectService: ProjectService, private alertService: AlertService) {}

  ngOnInit(): void {
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
    console.log(this.sections);
    

    this.projectService.createProperty(this.project.id!, this.property).subscribe(
      (property) => {
        this.alertService.successAlert("Propriedade alterada com sucesso!");
      }, (error) => {
        console.log(error);
      });

    
  }

  pencilClick() {
    this.pencil.emit();
  }

  delete(propertyList: PropertyList) {
    this.property.propertyLists = this.property.propertyLists.filter((p) => p.id != propertyList.id);
  }

  // In this method, it verifies if the index of the list is 1 or 0 to change the position in the correct
  drop(event: CdkDragDrop<any[]>, i: number) {
    // if ((event.previousContainer === event.container) && i == 0) {
    //   moveItemInArray(this.itemsList[0].name, event.previousIndex, event.currentIndex);
    // } else if ((event.previousContainer === event.container) && i == 1) {
    //   moveItemInArray(this.itemsList[1].name, event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   )
    // }
  }

  createProperty() : void{
    let newPropertyList: PropertyList = { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Novo Item", color: 'BLUE' };
    this.property.propertyLists.push(newPropertyList);
    this.projectService.createProperty(this.project.id!, this.property).subscribe(
      (property) => {
        this.sections[0].propertyLists.push(newPropertyList);
        this.alertService.successAlert("Propriedade alterada com sucesso!");
      }, (error) => {
        console.log(error);
      });
  }
}