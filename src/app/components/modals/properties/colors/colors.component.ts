import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeft, faCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import {  PropertyList } from 'src/app/models/property';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-colors',
    templateUrl: './colors.component.html',
    styleUrls: ['./colors.component.scss']
})
export class ColorsComponent {

    faCheck = faCheck;
    faArrowLeft = faArrowLeft;
    circleInfo = faCircleInfo;

    @Input()
    propertyList!: PropertyList;

    @Output()
    changeColor = new EventEmitter<PropertyList>();

    currentColor: string = '#49759D50';



    colorsList = [
        { name: 'Azul', color: "#d3e5ef", status: 'unselected' },
        { name: 'Verde', color: "#dbeddb", status: 'unselected' },
        { name: 'Amarelo', color: "#fdecc8", status: 'unselected' },
        { name: 'Laranja', color: "#fadec9", status: 'unselected' },
        { name: 'Vermelho', color: "#ffe2dd", status: 'unselected' },
        { name: 'Rosa', color: "#f5e0e9", status: 'unselected' },
        { name: 'Roxo', color: "#e8deee", status: 'unselected' },
        { name: 'Cinza', color: "#e3e2e0", status: 'unselected' },
    ]

    ngOnInit() {
        this.colorsList.forEach((color) => {
            if (color.color == this.propertyList.color) {
                color.status = 'selected';
                this.currentColor = color.color;
            }
        });
    }

    selectColor(color: any) {
        this.colorsList.forEach((item) => {
            if (item == color) {
                item.status = 'selected';
                this.currentColor = item.color;
                this.propertyList.color = this.currentColor;
            } else {
                item.status = 'unselected';
            }
        });
        this.changeColor.emit(this.propertyList);
    }
}