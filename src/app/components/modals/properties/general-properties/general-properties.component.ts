import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faArrowLeft, faXmark, faEye, faGear,
  faTrashCan, faEyeSlash, faEllipsisVertical,
  faFont, faCalendarDays, faPlus, faSpinner, faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, CdkDropList, moveItemInArray, CdkDrag, transferArrayItem } from '@angular/cdk/drag-drop';
import { Property, PropertyKind, PropertyStatus } from 'src/app/models/property';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';

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
  gear = new EventEmitter();

  @Output()
  plus = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  @Output()
  select = new EventEmitter();

  @Output()
  status = new EventEmitter();

  @Input()
  project!: Project;


  constructor(private projectService: ProjectService) {

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
      properties: []
    },
    {
      status: 'Não visíveis',
      opacity: true,
      icon: faEyeSlash,
      properties: []
    }
  ]

  ngOnInit(): void {
    console.log(this.project);
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

    console.log(this.propertiesList);
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
      isObligated: false,
    });

    this.projectService.createProperty(this.project.id!, genericProperty).subscribe(
      (property) => {
        console.log(property);
        property.propertyLists = [];
        this.project.properties.push(property);
        this.propertiesList[1].properties.push(property);
      }, (error) => {
        console.log(error);
      });
  }



  clickGear() {
    // this.gear.emit({ list: this.propertiesList[i].properties[i2].name });
    // console.log(this.propertiesList[i].properties[i2].name)
  }

  clickPlus(type: string) {
    this.plus.emit();
  }

  editProperty() {
    // if (this.propertiesList[i].properties[i2].icon === faSpinner) {
    //   this.status.emit();
    // } else if (this.propertiesList[i].properties[i2].icon === faCaretDown) {
    //   this.select.emit();
    // } else {
    //   if (this.propertiesList[i].properties[i2].icon != faCalendarDays) {
    //     this.edit.emit({ list: this.propertiesList[i].properties[i2].name });
    //   }
    // }
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
    this.projectService.createProperty(this.project.id!, property).subscribe(
      (property) => {
        console.log(property);
        
      }, (error) => {
        console.log(error);
      });
  }

  delete(property: Property) {
    console.log(property.id);
    this.projectService.deleteProperty(this.project.id!, property.id).subscribe(
      (project) => {
        console.log(project);

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

  getIconProperty(kindProperty : PropertyKind) : any {
    if(kindProperty === PropertyKind.TEXT){
      return faFont;
    } else if(kindProperty === PropertyKind.DATE){
      return faCalendarDays;
    } else {
      return faSpinner;
    }

  }
}

