import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faArrowLeft, faXmark, faPlus, faTrashCan, faEye, faEyeSlash,
  faFont, faCalendarDays, faSpinner, faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { elements } from 'chart.js';
import { Project } from 'src/app/models/project';
import { Property, PropertyList } from 'src/app/models/property';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {
  faArrowLeft = faArrowLeft;
  faXmark = faXmark;
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faFont = faFont;
  faCalendarDays = faCalendarDays;
  faSpinner = faSpinner;
  faCaretDown = faCaretDown;
  currentModal: string = 'general';
  text?: string = 'Propriedades';
  footerText?: string = 'Adicionar Propriedade';
  propertiesType: any;

  @Output()
  close = new EventEmitter<Event>();

  @Input()
  project!: Project;

  @Input()
  height?: String;

  @Input()
  width?: String;

  @Output()
  changeProjectSettings = new EventEmitter<Project>();


  closeModal() {
    this.close.emit();
  }

  property!: Property;

  constructor(private propertyService: PropertyService, private alertService: AlertService) { }



  editTask(type: string, event: any) {
    this.property = event;
    this.currentModal = type;
    if (type === 'items-selection') {
      this.text = 'Itens de Seleção'
    } else if (type === 'edit') {
      this.text = 'Edite a Propriedade'
    }
  }

  propertyListColor!: PropertyList;
  openColors(type: string, propertyList: PropertyList) {
    if (type == 'items-selection') {
      this.from = 'items-selection';
    } else if (type == 'status') {
      this.from = 'status';
    }
    this.propertyListColor = propertyList;
    this.currentModal = 'colors'
    this.text = "Cores"
  }

  //Determines the arrow back behavior
  from!: String;
  arrowLeft() {
    if (this.currentModal === 'general') {
      this.closeModal();
    } else if (this.currentModal === 'edit' || this.currentModal === 'status') {
      this.currentModal = 'general';
      this.text = 'Propriedades'
    } else if (this.currentModal === 'items-selection' && this.from == 'edit') {
      this.currentModal = 'edit';
      this.text = 'Edite a Propriedade'
    } else if (this.currentModal === 'items-selection') {
      this.currentModal = 'general';
      this.text = 'Edite a Propriedade'
    } else if (this.currentModal === 'colors' && this.from == 'items-selection') {
      this.currentModal = 'items-selection';
      this.text = 'Itens de Seleção'
    } else if (this.currentModal === 'colors' && this.from == 'status') {
      this.currentModal = 'status';
      this.text = 'Itens de Seleção'
    }


  }

  defineItemsSelectionPathBack(event: any) {
    this.from = event;
    if (this.from == 'edit') {
      this.currentModal = 'items-selection';
      this.text = 'Edite a Propriedade'
    }
  }

  changePropertyListColor(propertyList: PropertyList): void {
    if (this.property) {
      this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
        (property) => {
          
        },
        (error) => {
          
        }
      );
    }
  }
  updateProject(project : Project) {
    this.project = project;
    this.changeProjectSettings.emit(project);
  }


  openStatus(property: Property) {
    this.currentModal = 'status';
    this.text = 'Status';
    this.from = 'general';
    this.property = property;
  }

}
