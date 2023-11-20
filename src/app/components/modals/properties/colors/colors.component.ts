import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent {

    faArrowLeft = faArrowLeft;

    @Output()
    close = new EventEmitter<Event>();
  
    @Input()
    height?: String;
  
    @Input()
    width?: String;

    @Output()
    color = new EventEmitter<String>();

    colorsList =[
        {name: 'Azul', color: '#49759D', status: 'selected'},
        {name: 'Verde', color: '#D9EED2', status: 'unselected'},
        {name: 'Amarelo', color: '#F5EFD2', status: 'unselected'},
        {name: 'Laranja', color: '#F4D9C5', status: 'unselected'},
        {name: 'Vermelho', color: '#F3D1D1', status: 'unselected'},
        {name: 'Rosa', color: '#F7E2E4', status: 'unselected'},
        {name: 'Roxo', color: '#E5DFED', status: 'unselected'},
        {name: 'Cinza', color: '#F3F3F3', status: 'unselected'},
        {name: 'Marrom', color: '#D5CFCC', status: 'unselected'},
    ]

    selectColor(i: number){
        this.colorsList.forEach((item, index) => {
            if(index === i){
                item.status = 'selected';
                this.color.emit('item.color');
            }else{
                item.status = 'unselected';
            }
        });
    }
}