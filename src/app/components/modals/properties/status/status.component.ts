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

  @Input()
  project!: Project;

  @Input()
  property!: Property;

  clickPencil() {
    this.pencil.emit();
  }

  constructor(private projectService: ProjectService, private alertService: AlertService) { }


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
      value: 'Novo Status',
      color: status.color,
      propertyListKind: status.kind
    };
    this.property.propertyLists.push(newPropertyList);
    status.properties.push(newPropertyList);

    this.saveProperty();

    // this.statusList[item].properties.push({name: 'Novo Status'});
  }

  delete(status:any, propertyList: PropertyList) {
    status.properties.splice(status.properties.indexOf(propertyList), 1); 
    this.property.propertyLists.splice(this.property.propertyLists.indexOf(propertyList), 1);

    
    console.log(this.property);
    
    this.saveProperty();
  }

  drop(event: CdkDragDrop<any>, i: number) {
    if ((event.previousContainer === event.container) && i == 0) {
      moveItemInArray(this.statusList[0].properties, event.previousIndex, event.currentIndex);
    } else if ((event.previousContainer === event.container) && i == 1) {
      moveItemInArray(this.statusList[1].properties, event.previousIndex, event.currentIndex);
    } else if ((event.previousContainer === event.container) && i == 2) {
      moveItemInArray(this.statusList[2].properties, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }

  private saveProperty(){
    this.projectService.createProperty(this.project.id!, this.property).subscribe(
      (property) => {
        this.property = property;
        this.alertService.successAlert('Status criado com sucesso!');
      },
      (error) => {
        this.alertService.errorAlert('Erro ao criar Status!');
      }
    );
  }
}