import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  faCaretDown, faSpinner, faUser, faPaperclip,
  faFont, faCalendarDays, faSquare, faTrashCan, faListOl
} from '@fortawesome/free-solid-svg-icons';
import { Property, PropertyKind } from 'src/app/models/property';

@Component({
  selector: 'app-edit-properties',
  templateUrl: './edit-properties.component.html',
  styleUrls: ['./edit-properties.component.scss']
})
export class EditPropertiesComponent {

  @Output()
  selection = new EventEmitter<String>();

  @Input() property!: Property;

  faCaretDown = faCaretDown;
  faSpinner = faSpinner;
  faUser = faUser;
  faPaperclip = faPaperclip;
  faFont = faFont;
  faCalendarDays = faCalendarDays;
  faSquare = faSquare;
  faTrashCan = faTrashCan;
  faListOl = faListOl;
  openInput: boolean = false;
  selectedProperty: string = "Texto";

  ngOnInit(): void {
    console.log(this.property);
  }

  propertyTypes = [
    { name: 'Texto', icon: faFont, value: false },
    { name: 'Seleção', icon: faCaretDown, value: false },
    { name: 'Número', icon: faListOl, value: false },
  ]

  checkboxList = [
    { p: 'Tornar a propriedade obrigatória', value: false, visibility: true },
    { p: 'Definir um valor padrão?', value: false, visibility: false }
  ]

  defineValue(i: number) {
    this.checkboxList[i].value = !this.checkboxList[i].value;
    if (this.checkboxList[1].value === true) {
      this.openInput = true;
    }
  }

  selectValue(i: number) {
    let cont1 = 0;
    for (let cont = 0; cont < this.propertyTypes.length; cont++) {
      if (this.propertyTypes[cont].value === true) {
        cont1 = cont1 + 1
        if (cont1 == 1) {
          this.propertyTypes[cont].value = false;
          cont1 = 0;
        }
      }
    };
    this.propertyTypes[i].value = !this.propertyTypes[i].value;
  }

  selectIcon(icon: number) {
    console.log(this.selectedProperty);

    this.selectedProperty = this.propertyTypes[icon].name;

    if(this.selectedProperty != 'Texto'){
      this.openInput = false;
    }

    if (this.selectedProperty === 'Texto') {
      this.checkboxList[1].visibility = true;
      this.checkboxList[2].visibility = false;
    } else {
      this.checkboxList[1].visibility = false;
      this.checkboxList[2].visibility = false;
    }
  }

  selectionItems(i: number) {
    if (this.propertyTypes[i].name === 'Seleção') {
      this.selection.emit();
    }
  }

  getKindProperty(property: PropertyKind) {
    if (property === PropertyKind.TEXT) {
      return true;
    } else if (property === PropertyKind.LIST) {
      return true;
    } else if (property === PropertyKind.NUMBER) {
      return true;
    }
    return false;
  }



  // check() {
  //   if (this.name === 'Nome da Tarefa') {
  //     this.propertyTypes[0].value = true;
  //   } else if (this.name === 'Itens Seleção') {
  //     this.propertyTypes[1].value = true;
  //   } else if (this.name === 'Número'){
  //     this.propertyTypes[2].value = true;
  //   }
  // }
}
