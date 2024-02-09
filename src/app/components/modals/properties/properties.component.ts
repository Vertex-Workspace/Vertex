import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeft, faXmark, faPlus, faTrashCan, faEye, faEyeSlash,
faFont, faCalendarDays, faSpinner, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { elements } from 'chart.js';
import { Project } from 'src/app/models/project';
import { Property } from 'src/app/models/property';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent{

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
  text ?:string = 'Propriedades';
  footerText ?: string = 'Adicionar Propriedade';
  propertiesType: any;

  @Output()
  close = new EventEmitter<Event>();

  @Input()
  project!: Project;

  @Input()
  height?: String;

  @Input()
  width?: String;

  closeModal() {
    this.close.emit();
  }

  property!: Property;



  editTask(type: string, event: any) {
    console.log(type);
    
    console.log(event);
    this.property = event;
    this.currentModal = type
    this.text = 'Edite a Propriedade'
    this.footerText = 'Excluir Propriedade'
  }

  openStatusSelection(type: string) {
    if (type === 'items-selection') {
      this.currentModal = 'items-selection'
      this.text = "Itens Seleção"
      this.footerText = 'Adicionar Elemento'
    }else if(type === 'status'){
      this.currentModal = 'status'
      this.text = "Status"
      this.footerText = ''
    }else if (type === 'pencil') {
      this.currentModal = 'colors'
      this.text = "Cores"
      this.footerText = ''
    }
  }

  arrowLeft() {
    if (this.currentModal === 'status' 
    || this.currentModal === 'edit' 
    || this.currentModal === 'items-selection') {
      this.currentModal = 'general'
      this.text = 'Propriedades'
    } else if (this.currentModal === 'colors') {
      this.currentModal = 'status'
      this.text = 'Status'
    }
  }
}
