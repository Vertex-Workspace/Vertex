import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faArrowLeft, faXmark, faPlus, faTrashCan, faEye, faEyeSlash,
  faFont, faCalendarDays, faSpinner, faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { elements } from 'chart.js';
import { Project } from 'src/app/models/class/project';
import { Property, PropertyList } from 'src/app/models/class/property';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { PropertyService } from 'src/app/services/property.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-properties',
  templateUrl: './modal-properties.component.html',
  styleUrls: ['./modal-properties.component.scss']
})
export class ModalPropertiesComponent {

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

  canCreate : boolean = false;

  delete: boolean = false;

  closeModal() {
    this.close.emit();
  }

  property!: Property;

  constructor(private propertyService: PropertyService,
    private alertService: AlertService,
    private teamService: TeamService,
    private userService: UserService) { }

  ngOnInit() {
    this.teamService.hasPermission(this.project.id, this.userService.getLogged()).subscribe((permissions: Permission[]) => {
      this.userService.getLogged().permissions = permissions;

      for (const permission of permissions) {
        if (permission.name === PermissionsType.CREATE && permission.enabled) {
          this.canCreate = true;
          console.log(this.canCreate);
        }
      }
    })
    
  }


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
    if (this.currentModal === 'edit' || this.currentModal === 'status' || (this.currentModal === 'items-selection' && this.from != 'edit')) {
      this.currentModal = 'general';
      this.text = 'Propriedades'
    } else if (this.currentModal === 'items-selection' && this.from == 'edit') {
      this.currentModal = 'edit';
      this.text = 'Edite a Propriedade'
    } else if (this.currentModal === 'colors' && this.from == 'items-selection') {
      this.currentModal = 'items-selection';
      this.text = 'Itens de Seleção'
    } else if (this.currentModal === 'colors' && this.from == 'status') {
      this.currentModal = 'status';
      this.text = 'Status'
    }


  }

  defineItemsSelectionPathBack(event: any) {
    if (event == undefined) {
      this.from = 'general';
    } else {
      this.currentModal = 'items-selection';
      this.text = 'Edite a Propriedade'
      this.from = 'edit';
      this.property = event;
    }
  }

  changePropertyListColor(propertyList: PropertyList): void {
    this.propertyService.changeColor(propertyList).subscribe(
      (propertyResponse) => {
        this.project.properties!.forEach((property: Property) => {
          if (property.id === propertyResponse.id) {
            property = propertyResponse;
            this.property = propertyResponse;
          }
        });
      }
    );
  }
  updateProject(project: Project) {
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
