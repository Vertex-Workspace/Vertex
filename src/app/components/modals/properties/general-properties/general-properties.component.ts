import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faArrowLeft, faXmark, faEye, faGear,
  faTrashCan, faEyeSlash, faEllipsisVertical,
  faFont, faCalendarDays, faPlus, faSpinner, faCaretDown, fa1, faListNumeric, faList
} from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, CdkDropList, moveItemInArray, CdkDrag, transferArrayItem } from '@angular/cdk/drag-drop';
import { Property, PropertyKind, PropertyStatus } from 'src/app/models/property';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-general-properties',
  templateUrl: './general-properties.component.html',
  styleUrls: ['./general-properties.component.scss']
})
export class GeneralPropertiesComponent {

  faArrowLeft = faArrowLeft;
  faXmark = faXmark;
  faEye = faEye;
  faGear = faGear;
  faTrashCan = faTrashCan;
  faEyeSlash = faEyeSlash;
  faEllipsisVertical = faEllipsisVertical;
  faFont = faFont;
  faCalendarDays = faCalendarDays;
  faPlus = faPlus;
  faSpinner = faSpinner;

  currentModal: string = 'general';
  generalModal: boolean = true;

  @Output()
  close = new EventEmitter();

  @Input()
  height?: String;

  @Input()
  width?: String;


  @Output()
  edit = new EventEmitter();

  @Output()
  select = new EventEmitter();

  @Output()
  status = new EventEmitter<Property>();

  @Output()
  changeProject = new EventEmitter<Project>();

  @Input()
  project!: Project;


  constructor(private propertyService: PropertyService, private projectService : ProjectService) { 

  }

  propertiesList: any[] = [
    {
      status: 'Fixas',
      opacity: false,
      icon: faEye,
      properties: []
    },
    {
      status: 'Visíveis',
      opacity: false,
      icon: faEye,
      properties: [],
    },
    {
      status: 'Não visíveis',
      opacity: true,
      icon: faEyeSlash,
      properties: [],
    }
  ]

  ngOnInit(): void {
    this.separePropertiesKind();
  }

  private separePropertiesKind() {
    this.propertiesList[0].properties = [];
    this.propertiesList[1].properties = [];
    this.propertiesList[2].properties = [];
    this.project.properties.forEach(
      (property) => {
        // [0] - FIXED, [1] - VISIBLE, [2] - INVISIBLE
        if (property.propertyStatus === PropertyStatus.FIXED) {
          this.propertiesList[0].properties.push(property);
        } else if (property.propertyStatus === PropertyStatus.VISIBLE) {
          this.propertiesList[1].properties.push(property);
        } else {
          this.propertiesList[2].properties.push(property);
        }
      });
  }


  closeModal() {
    this.close.emit();
  }

  createProperty() {
    //BUROCRACY, THE BACK END DOESN'T NEED THIS TO CREATE A DEFAULT PROPERTY
    let genericProperty = new Property({
      id: 0,
      name: 'Nova Propriedade',
      kind: PropertyKind.TEXT,
      propertyStatus: PropertyStatus.VISIBLE,
      propertyLists: [],
  
    });

    this.propertyService.createOrEditProperty(this.project.id!, genericProperty).subscribe(
      (property) => {
        property.propertyLists = [];
        this.projectService.getOneById(this.project.id!).subscribe(
          (project) => {
            this.project = project;
            this.propertiesList[1].properties.push(property);
            this.changeProject.emit(project);
          }, (error) => {
            console.log(error);
          });
      }, (error) => {
        console.log(error);
      });
  }





  editProperty(property: Property, type : string) {
    if (property.kind === PropertyKind.STATUS) {
      this.status.emit(property);
    } else if (property.kind == PropertyKind.LIST && type == 'row') {
      this.select.emit(property);
    } 
    else if(property.kind === PropertyKind.DATE){
      //Alert or message
    } else {
      this.edit.emit(property);
    }
  }


  changeStatus(property: Property) {
    if (property.propertyStatus === PropertyStatus.VISIBLE) {
      this.propertiesList[1].properties.splice(this.propertiesList[1].properties.indexOf(property), 1);
      this.propertiesList[2].properties.push(property);
      property.propertyStatus = PropertyStatus.INVISIBLE;
    } else {
      this.propertiesList[2].properties.splice(this.propertiesList[2].properties.indexOf(property), 1);
      this.propertiesList[1].properties.push(property);
      property.propertyStatus = PropertyStatus.VISIBLE;
    }
    this.propertyService.createOrEditProperty(this.project.id!, property).subscribe(
      (property) => {
        console.log(property);

      }, (error) => {
        console.log(error);
      });
  }

  delete(property: Property) {
    this.propertyService.deleteProperty(this.project.id!, property.id).subscribe(
      (project) => {
        //[1] - VISIBLE, [2] - INVISIBLE
        if (property.propertyStatus === PropertyStatus.VISIBLE) {
          this.propertiesList[1].properties.splice(this.propertiesList[1].properties.indexOf(property), 1);
        } else {
          this.propertiesList[2].properties.splice(this.propertiesList[2].properties.indexOf(property), 1);
        }
        this.project.properties = this.project.properties.filter((p) => p.id !== property.id);
      }, (error) => {
        console.log(error);
      });
  }

  // the number of fixed itens list is 0, so the user can't move the other itens into it
  drop(event: CdkDragDrop<any[]>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  getIconProperty(kindProperty: PropertyKind): any {
    if (kindProperty === PropertyKind.TEXT) {
      return faFont;
    } else if (kindProperty === PropertyKind.DATE) {
      return faCalendarDays;
    } else if (kindProperty === PropertyKind.STATUS) {
      return faSpinner;
    } else if (kindProperty === PropertyKind.LIST) {
      return faList;
    } else if(kindProperty === PropertyKind.NUMBER){
      return fa1;
    }

  }
}

