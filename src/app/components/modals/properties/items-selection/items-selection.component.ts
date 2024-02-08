import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faEllipsisVertical, faPaintBrush, faEye, faEyeSlash,
  faTrashCan, faPlus
} from '@fortawesome/free-solid-svg-icons';
import { Property, PropertyList, PropertyListKind } from 'src/app/models/property';

@Component({
  selector: 'app-items-selection',
  templateUrl: './items-selection.component.html',
  styleUrls: ['./items-selection.component.scss']
})
export class ItemsSelectionComponent {

  @Input()
  property!: Property;

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

  ngOnInit(): void {
    this.property.propertyLists!.forEach((propertyList) => {
      if (propertyList.propertyListKind == PropertyListKind.VISIBLE) {
        this.sections[0].propertyLists.push(propertyList);
      } else {
        this.sections[1].propertyLists.push(propertyList);
      }
    });
  }

  eyeVisibility(propertyList:PropertyList) {
    propertyList.propertyListKind = 
    propertyList.propertyListKind == PropertyListKind.VISIBLE ? PropertyListKind.INVISIBLE : PropertyListKind.VISIBLE;
  }

  pencilClick() {
    this.pencil.emit();
  }

  delete(propertyList:PropertyList) {
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
}