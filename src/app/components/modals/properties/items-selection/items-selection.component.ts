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

    faEllipsisVertical = faEllipsisVertical;
    faPaintBrush = faPaintBrush;
    faEye = faEye;
    faEyeSlash = faEyeSlash;
    faTrashCan = faTrashCan;
    faPlus = faPlus;

    itemsList = [
        { name: 'Renda Fixa', status: 'visible', icon: faEye },
        { name: 'Fill', status: 'visible', icon: faEye },
        { name: 'Renda variável', status: 'invisible', icon: faEyeSlash }
    ]

    eyeVisibility(i: number) {
        if (this.itemsList[i].status == 'visible') {
            this.itemsList[i].status = 'invisible';
            this.itemsList[i].icon = faEyeSlash;
        }else if(this.itemsList[i].status == 'invisible'){
            this.itemsList[i].status = 'visible';
            this.itemsList[i].icon = faEye;
        }
    }

    add(){
        this.itemsList.push({name: 'New Item', status: 'visible', icon: faEye});
    }

}