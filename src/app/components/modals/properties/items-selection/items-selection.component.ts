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

    eyeVisibility(i: number) {
        if (this.itemsList[i].status == 'visible') {
            this.itemsList[i].status = 'invisible';
            this.itemsList[i].icon = faEyeSlash;
        } else if (this.itemsList[i].status == 'invisible') {
            this.itemsList[i].status = 'visible';
            this.itemsList[i].icon = faEye;
        }
    }

    pencilClick() {
        this.pencil.emit();
    }
}