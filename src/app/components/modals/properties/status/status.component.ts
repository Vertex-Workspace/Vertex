import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faArrowLeft, faPaintBrush, faTrashCan, faEllipsisVertical,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Property, PropertyList, PropertyListKind } from 'src/app/models/property';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  faArrowLeft = faArrowLeft;
  faPaintBrush = faPaintBrush;
  faTrashCan = faTrashCan;
  faEllipsisVertical = faEllipsisVertical;
  faPlus = faPlus;
  colorModal: boolean = false

  @Output()
  pencil = new EventEmitter<String>();

  @Output()
  changeProject = new EventEmitter<Project>();


  @Input()
  project!: Project;

  @Input()
  property!: Property;

  clickPencil() {
    this.pencil.emit();
  }

  constructor(private propertyService: PropertyService, private alertService: AlertService, private projectService : ProjectService) { }


  statusList: any[] = [
    {
      kind: PropertyListKind.TODO,
      name: 'Não iniciado',
      color: "#ffe2dd",
      properties: []
    },
    {
      kind: PropertyListKind.DOING,
      name: 'Em andamento',
      color: "#fdecc8",
      properties: []
    },
    {
      kind: PropertyListKind.DONE,
      name: 'Concluída',
      color: "#dbeddb",
      properties: []
    }
  ]
  ngOnInit(): void {
    this.getPropertiesKind();
  }

  private getPropertiesKind(){
    this.statusList[0].properties = [];
    this.statusList[1].properties = [];
    this.statusList[2].properties = [];
    this.property.propertyLists.forEach((propertyList) => {
      if (propertyList.propertyListKind == PropertyListKind.TODO) {
        this.statusList[0].properties.push(propertyList);
      } else if (propertyList.propertyListKind == PropertyListKind.DOING) {
        this.statusList[1].properties.push(propertyList);
      } else if (propertyList.propertyListKind == PropertyListKind.DONE) {
        this.statusList[2].properties.push(propertyList);
      }
    });
  }

  add(status: any) {
    let newPropertyList: PropertyList = {
      id: 0,
      value: status.name,
      color: status.color,
      propertyListKind: status.kind, 
      isFixed: false
    };
    this.property.propertyLists.push(newPropertyList);
    status.properties.push(newPropertyList);

    this.saveProperty();

    // this.statusList[item].properties.push({name: 'Novo Status'});
  }

  delete(status:any, propertyList: PropertyList) {
    if(!propertyList.isFixed){

      this.propertyService.deletePropertyList(this.property.id!, propertyList.id).subscribe(
        (propertyResponse) => {
          this.projectService.getOneById(this.project.id!).subscribe(
            (projectResponse) => {
              this.project = projectResponse;
              this.property = this.project.properties[0];
              this.getPropertiesKind();
              this.changeProject.emit(this.project);
            },
            (error) => {
              console.log("ERRO!" + error);
            }
          )
        },
        (error) => {
          console.log("ERRO!" + error);
          
        }
        )
    }
  }

  drop(event: CdkDragDrop<any>, status: any) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    status.properties.forEach((propertyList : PropertyList) => {
      if(propertyList.propertyListKind != status.kind){
        this.property.propertyLists.forEach((propertyListOriginal: PropertyList) => {
          if(propertyListOriginal.id == propertyList.id){
            //Change the current value of Kind
            propertyListOriginal.propertyListKind = status.kind;
            propertyList.propertyListKind = status.kind;
            this.saveProperty();
          }
        });

      }
    });
  }

  private saveProperty(){
    this.propertyService.createOrEditProperty(this.project.id!, this.property).subscribe(
      (propertyResponse) => {
        this.project.properties[0] = propertyResponse;
        this.getPropertiesKind();
        this.changeProject.emit(this.project);
      },
      (error) => {

      }
    );
  }
}