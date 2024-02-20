import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faCaretDown, faSpinner, faUser, faPaperclip,
  faFont, faSquare, faTrashCan, fa1, faCircleInfo, faList, faEye, faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Property, PropertyKind, PropertyList, PropertyListKind } from 'src/app/models/property';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-properties',
  templateUrl: './edit-properties.component.html',
  styleUrls: ['./edit-properties.component.scss']
})
export class EditPropertiesComponent {


  @Input() project!: Project;

  @Input() property!: Property;

  @Output() confirmChanges = new EventEmitter<Property>();

  @Output() from = new EventEmitter<String>();

  faSpinner = faSpinner;
  faUser = faUser;
  faPaperclip = faPaperclip;
  faSquare = faSquare;
  faTrashCan = faTrashCan;
  circleInfo = faCircleInfo;
  faList = faList;

  openInput: boolean = false;

  propertyTypes = [
    { icon: faFont, value: false, type: PropertyKind.TEXT, label: 'Texto' },
    { icon: fa1, value: false, type: PropertyKind.NUMBER, label: 'Número' },
    { icon: faList, value: false, type: PropertyKind.LIST, label: 'Lista' },
  ]

  checkboxList = [
    {
      p: 'Tornar a propriedade obrigatória', value: false,
      kinds: [
        PropertyKind.TEXT, PropertyKind.NUMBER
      ]
    },
    {
      p: 'Definir um valor padrão', value: false,
      kinds: [
        PropertyKind.TEXT
      ]
    }
  ]

  constructor(private projectService: ProjectService, private alertService: AlertService) {

  }

  defaultProperty!: Property
  ngOnInit(): void {
    //Create a new object to compare with the original
    this.defaultProperty = new Property(this.property);

    if (this.property.isObligate) {
      this.checkboxList[0].value = true;
    }
    if (this.property.defaultValue) {
      this.checkboxList[1].value = true;
      this.openInput = true;
    }

    this.from.emit('general');
  }

  selectValue(type: any) {
    this.property.kind = type.type;
  }

  getKindProperty(propertyKind: PropertyKind): boolean {
    if (this.property.kind === propertyKind) {
      return true;
    } else if (this.property.kind === propertyKind) {
      return true;
    } else if (this.property.kind === propertyKind) {
      return true;
    }
    return false;
  }


  checkBox(check: any): void {
    //Change current state
    check.value = !check.value;

    if (this.checkboxList[0] == check) {
      this.property.isObligate = check.value;
    } else {
      this.openInput = check.value;
      if (!this.openInput) {
        this.property.defaultValue = "";
      }
    }
    console.log(this.property);

  }
  saveProperty(): void {
    if (this.property.kind === PropertyKind.LIST && this.property.propertyLists.length === 0) {
      this.openEditList();
    } else {


      this.projectService.createProperty(this.project.id!, this.property).subscribe(
        (property) => {
          this.alertService.successAlert("Propriedade alterada com sucesso!");

          this.project.properties.splice(this.project.properties.indexOf(this.defaultProperty), 1, property);

          //If the button pressed was the confirm changes, emit the event
          //Else, just update the property through define elements list
          this.confirmChanges.emit(property);

        }, (error) => {
          this.alertService.errorAlert("Erro ao alterar propriedade!");
        });

    }
  }

  containsKindInto(check: any): boolean {
    return check.kinds.includes(this.property.kind);
  }

  hasChange(): boolean {
    return this.property.name !== this.defaultProperty.name ||
      this.property.kind !== this.defaultProperty.kind ||
      this.property.isObligate !== this.defaultProperty.isObligate ||
      this.property.defaultValue !== this.defaultProperty.defaultValue;
  }


  openEditList(): void {
    if (this.property.propertyLists.length === 0) {
      this.property.propertyLists = [
        { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Alta", color: "#ffe2dd" },
        { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Média", color: "#fdecc8" },
        { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Baixa", color: "#dbeddb" },
        { id: 0, propertyListKind: PropertyListKind.INVISIBLE, value: "Não essencial", color: "#d3e5ef" },
      ]

      this.projectService.createProperty(this.project.id!, this.property).subscribe(
        (property) => {
          this.property = property;
          this.from.emit('edit');
        }, (error) => {
          console.log(error);
        });
    } else {
      if (this.hasChange()) {
        this.saveProperty();
      }
      this.from.emit('edit');
    }
  }
}
