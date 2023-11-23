import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    faEllipsisVertical, faPaintBrush, faEye, faEyeSlash,
    faTrashCan, faPlus
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-items-selection',
    templateUrl: './items-selection.component.html',
    styleUrls: ['./items-selection.component.scss']
})
export class ItemsSelectionComponent {

    @Input()
    itemsList: any;

    @Output()
    pencil = new EventEmitter();

    faEllipsisVertical = faEllipsisVertical;
    faPaintBrush = faPaintBrush;
    faEye = faEye;
    faEyeSlash = faEyeSlash;
    faTrashCan = faTrashCan;
    faPlus = faPlus;

    eyeVisibility(namep: string, i: number, i2: number) {
        let visibles: any = this.itemsList[0].name;
        let invisibles: any = this.itemsList[1].name;
    
        if (this.itemsList[i].icon === faEye) {
          invisibles.push({ name: namep});
          visibles.splice(i2, 1);
        } else {
          visibles.push({ name: namep});
          invisibles.splice(i2, 1);
        }
      }

    pencilClick() {
        this.pencil.emit();
    }

    delete(i:number, i2:number){
        this.itemsList[i].name.splice(i2,1);
    }

      // In this method, it verifies if the index of the list is 1 or 0 to change the position in the correct
  drop(event: CdkDragDrop<any[]>, i: number) {
    if ((event.previousContainer === event.container) && i==0) {
      moveItemInArray(this.itemsList[0].name, event.previousIndex, event.currentIndex);
    }else if((event.previousContainer === event.container) && i==1){
      moveItemInArray(this.itemsList[1].name, event.previousIndex, event.currentIndex);
    }else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}