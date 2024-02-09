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


  @Input()
  project!: Project;

  @Input() property!: Property;
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
    console.log(this.property);
    
    //Create a new object to compare with the original
    this.defaultProperty = new Property(this.property);

    if (this.property.isObligated) {
      this.checkboxList[0].value = true;
    }
    if (this.property.defaultValue) {
      this.checkboxList[1].value = true;
      this.openInput = true;
    }
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
      this.property.isObligated = check.value;
    } else {
      this.openInput = check.value;
      if (!this.openInput) {
        this.property.defaultValue = "";
      }
    }
  }
  saveProperty(): void {
    this.projectService.createProperty(this.project.id!, this.property).subscribe(
      (property) => {
        console.log(property);
        this.alertService.successAlert("Propriedade alterada com sucesso!");
      }, (error) => {
        console.log(error);
      });

  }

  containsKindInto(check: any): boolean {
    return check.kinds.includes(this.property.kind);
  }

  hasChange(): boolean {
    return this.property.name !== this.defaultProperty.name ||
      this.property.kind !== this.defaultProperty.kind ||
      this.property.isObligated !== this.defaultProperty.isObligated ||
      this.property.defaultValue !== this.defaultProperty.defaultValue;
  }


  editList: boolean = false;
  openEditList(): void {
    if (!this.editList && this.property.propertyLists.length === 0) {
      this.property.propertyLists = [
        { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Alta", color: 'RED' },
        { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Média", color: 'YELLOW' },
        { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Baixa", color: 'GREEN' },
        { id: 0, propertyListKind: PropertyListKind.INVISIBLE, value: "Não essencial", color: 'BLUE' },
      ]

      console.log(this.property);
      
      this.projectService.createProperty(this.project.id!, this.property).subscribe(
        (property) => {
          this.property = property;
          this.editList = true;
        }, (error) => {
          console.log(error);
        });
    } else{
      this.editList = !this.editList;
    }
  }
}
