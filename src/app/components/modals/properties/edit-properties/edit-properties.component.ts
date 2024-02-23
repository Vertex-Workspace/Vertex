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
import { PropertyService } from 'src/app/services/property.service';

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

  @Output()
  changeProject = new EventEmitter<Project>();


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
      p: 'Definir um valor padrão', value: false,
      kinds: [
        PropertyKind.TEXT
      ]
    }
  ];
  

  constructor(private propertyService: PropertyService, private alertService: AlertService, private projectService : ProjectService) {

  }

  defaultProperty!: Property
  ngOnInit(): void {
    //Create a new object to compare with the original
    this.defaultProperty = new Property(this.property);

    if (this.property.defaultValue) {
      this.checkboxList[0].value = true;
      this.openInput = true;
    }

    this.from.emit('general');
  }

  selectValue(type: any) {
    this.property.kind = type.type;

    //CLEAR THE PROPERTY LISTS ON DATABASE
    if(this.property.kind !== PropertyKind.LIST){
      this.property.propertyLists = [];
    }
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
    this.openInput = check.value;

    if (!this.openInput) {
      this.property.defaultValue = "";
    }
  }
  saveProperty(): void {
    console.log(this.property);
    if (this.property.kind === PropertyKind.LIST && this.property.propertyLists.length === 0) {
      this.openEditList();
    } else {
      this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
        (property) => {
          
          console.log(this.project.id!);
          
          this.projectService.getOneById(this.project.id!).subscribe(
            (project) => {
              this.project = project;
              this.changeProject.emit(this.project);
              //If the button pressed was the confirm changes, emit the event
              //Else, just update the property through define elements list
              this.confirmChanges.emit(property);
            }, (error) => {
              console.log(error);
            });



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
      this.property.defaultValue !== this.defaultProperty.defaultValue;
  }


  openEditList(): void {
    if (this.property.propertyLists.length === 0) {
      this.property.propertyLists = [
        { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Alta", color: "#ffe2dd" , isFixed: false},
        { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Média", color: "#fdecc8" , isFixed: false},
        { id: 0, propertyListKind: PropertyListKind.VISIBLE, value: "Baixa", color: "#dbeddb" , isFixed: false},
        { id: 0, propertyListKind: PropertyListKind.INVISIBLE, value: "Não essencial", color: "#d3e5ef" , isFixed: false},
      ]

      this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
        (property) => {  
          this.projectService.getOneById(this.project.id!).subscribe(
            (project) => {
              this.project = project;
              this.property = property;
              this.changeProject.emit(this.project);
              this.from.emit('edit');
            }, (error) => {
              console.log(error);
            });

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
