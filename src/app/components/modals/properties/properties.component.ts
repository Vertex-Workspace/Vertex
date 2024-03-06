import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeft, faXmark, faPlus, faTrashCan, faEye, faEyeSlash,
faFont, faCalendarDays, faSpinner, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { elements } from 'chart.js';
import { Project } from 'src/app/models/class/project';

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

  name?: string;


  itemsList = [
    {
      status: 'Visíveis',
      icon: faEye,
      name : [
        {name: 'Renda Fixa'},
        {name: 'FII'},
      ]
    },
    {
      status: 'Não visíveis',
      icon: faEyeSlash,
      name : [
        {name: 'Ações'},
      ]
    }
  
]

  clickGear(type: string, event: any) {
    this.name = event.list;
      this.currentModal = 'edit'
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

  clickPlus() {
    if (this.currentModal === 'general') {
      this.name = 'Nova Propriedade'
      this.currentModal = 'edit';
      this.text = 'Edite a Propriedade'
      this.footerText = 'Excluir Propriedade'
    }if (this.currentModal === 'items-selection') {
      this.itemsList[0].name.push({ name: 'Novo item'});
    }
  }
}
