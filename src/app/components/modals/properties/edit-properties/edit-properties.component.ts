import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faCaretDown, faSpinner, faUser, faPaperclip,
  faFont, faSquare, faTrashCan, fa1, faCircleInfo
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
  faSpinner = faSpinner;
  faUser = faUser;
  faPaperclip = faPaperclip;
  faSquare = faSquare;
  faTrashCan = faTrashCan;

  circleInfo = faCircleInfo;

  openInput: boolean = false;
  selectedProperty: string = "Texto";


  defaultProperty: Property = this.property
  ngOnInit(): void {
  }

  propertyTypes = [
    { icon: faFont, value: false, type: PropertyKind.TEXT, label: 'Texto' },
    { icon: fa1, value: false, type: PropertyKind.NUMBER, label: 'Número'  },
    { icon: faCaretDown, value: false, type: PropertyKind.LIST, label: 'Lista'  },
  ]

  checkboxList = [
    { p: 'Tornar a propriedade obrigatória', value: false, visibility: true },
    { p: 'Definir um valor padrão?', value: false, visibility: false }
  ]

  selectValue(type : any) {
    this.property.kind = type.type;
  }

  // selectionItems(i: number) {
  //   if (this.propertyTypes[i].name === 'Seleção') {
  //     this.selection.emit();
  //   }
  // }

  getKindProperty(propertyKind: PropertyKind) : boolean {
    if (this.property.kind === propertyKind) {
      return true;
    } else if (this.property.kind === propertyKind) {
      return true;
    } else if (this.property.kind === propertyKind) {
      return true;
    }
    return false;
  }

  getAnyChange(): boolean{
    return this.property === this.defaultProperty;
  }

}
