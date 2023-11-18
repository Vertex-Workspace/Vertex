import { Component, EventEmitter, Input, Output } from '@angular/core';
import {faArrowLeft, faXmark, faCaretDown, faSpinner, faUser, faPaperclip,
faFont, faCalendarDays, faSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-properties',
  templateUrl: './edit-properties.component.html',
  styleUrls: ['./edit-properties.component.scss']
})
export class EditPropertiesComponent {

  @Output()
  close = new EventEmitter<Event>();

  @Input()
  height?: String;

  @Input()
  width?: String;
  
  faArrowLeft = faArrowLeft;
  faXmark = faXmark;
  faCaretDown = faCaretDown;
  faSpinner = faSpinner;
  faUser = faUser;
  faPaperclip = faPaperclip;
  faFont = faFont;
  faCalendarDays = faCalendarDays;
  faSquare = faSquare;
  faTrashCan = faTrashCan;

  value: boolean = false;
  openInput: boolean = false;

  propertyTypes = [
    {name: 'Texto', icon: faFont, value: false},
    {name: 'Data', icon: faCalendarDays, value: false},
    {name: 'Data', icon: faCaretDown, value: false},
    {name: 'Status', icon: faSpinner, value: false},
    {name: 'User', icon: faUser, value: false},
    {name: 'Data', icon: faPaperclip, value: false}
  ]

  checkboxList = [
    {p: 'Tornar a propriedade obrigatória', value: false},
    {p: 'Definir um valor padrão?', value:false}
  ]

  defineValue(i: number){
    this.checkboxList[i].value = !this.checkboxList[i].value;
    if(this.checkboxList[1].value === true){
      this.openInput= true;
    }
  }

  selectValue(i: number){
    this.propertyTypes[i].value = !this.propertyTypes[i].value;
  }


}
