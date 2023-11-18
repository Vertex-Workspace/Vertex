import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeft, faXmark, faEye, faGear,
        faTrashCan, faEyeSlash, faEllipsisVertical,
      faFont, faCalendarDays, faPlus, faSpinner} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

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
  editModal: boolean = false;
  modalStatus:boolean = false;

  propertiesList =[
    {name: 'Nome da Tarefa', status: 'visible', icon:faEye, icon2: faFont},
    {name: 'Prazo', status: 'visible', icon:faEye, icon2: faCalendarDays},
    {name: 'Status', status: 'invisible', icon:faEyeSlash, icon2: faSpinner}
  ]

  @Output()
  close = new EventEmitter<Event>();

  @Input()
  height?: String;

  @Input()
  width?: String;

  closeModal(){
    this.close.emit();
  }

  changeStatus(i: number){
    if(this.propertiesList[i].status === 'visible'){
      this.propertiesList[i].status = 'invisible';
      this.propertiesList[i].icon = faEyeSlash;
    }else{
      this.propertiesList[i].status = 'visible';
      this.propertiesList[i].icon = faEye;
    }
  }

  openEditModal(){
    this.editModal = true;
  }

  statusConfig(){
    this.modalStatus = true;
  }

}
