import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Property, PropertyKind, PropertyList } from 'src/app/models/property';
import { Task } from 'src/app/models/task';
import { Permission, PermissionsType } from 'src/app/models/user';
import { Value, ValueUpdate } from 'src/app/models/value';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-input-value-property',
  templateUrl: './input-value-property.component.html',
  styleUrls: ['./input-value-property.component.scss']
})
export class InputValuePropertyComponent {

  @Output()
  changes = new EventEmitter();

  @Input() backgroundColor ?: string = '';

  @Input()
  value!: Value;

  @Input()
  task!: Task;

  project !: Project;

  canEdit: boolean = false;

  constructor(private teamService: TeamService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
    private taskService: TaskService) {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.projectService
      .getOneById(id)
      .subscribe((p: Project) => {
        this.project = p;

        this.teamService.hasPermission(id, this.userService.getLogged()).subscribe((permissions: Permission[]) => {
          this.userService.getLogged().permissions = permissions;

          for (let i = 0; i < permissions.length; i++) {
            if ((permissions[i].name === PermissionsType.EDIT) && permissions[i].enabled === true) {
              this.canEdit = true
            }
          }
        });
      })
  }


  ngOnInit(): void {
    if(this.value.property.kind === PropertyKind.STATUS || 
      this.value.property.kind === PropertyKind.LIST){
      let valuePropertyList : PropertyList = this.value.value as PropertyList;
      this.backgroundColor = valuePropertyList.color;
    }
  }

  getValue(value: Value): string {
    if (value.value === null) {
      if (value.property.kind === PropertyKind.NUMBER) {
        return "0";
      }
      return "Vazio";
    }
    if (value.property.kind === PropertyKind.STATUS || value.property.kind === PropertyKind.LIST) {
      let valueProperty = value.value as PropertyList;
      return valueProperty.value;
    }
    if (value.property.kind === PropertyKind.DATE) {
      let date = new Date(value.value as string);
      //to format the date to yyyy-mm-dd
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
    return value.value as string;
  }


  getSelectOptions(value: Value): PropertyList[] { 
    return value.property.propertyLists;
  }

  getKind(property: Property, kind: string): boolean {
    return property.kind === kind;
  }

  isSelected(propertyList: PropertyList, value: Value): boolean {
    let valueProperty = value.value as PropertyList;
    return propertyList.id === valueProperty.id;
    
  }

  changeDate(event: any, value: Value): void {
    if (this.canEdit) {
      const newValue = event.toISOString().slice(0, -1);
      value.value = event;
      this.updateTask(value, newValue);
    }else {
      this.alertService.errorAlert("Você não tem permissão para editar!")
    }
  }

  change(event: any, value: Value): void {
    if(this.canEdit){
    const propertyId: number = event.value.id;
    if (value.value !== event.value.id) {
      let newValue: string | number | Date;
      if (value.property.kind === PropertyKind.NUMBER || value.property.kind === PropertyKind.STATUS ||
        value.property.kind === PropertyKind.LIST) {
        newValue = event.value.id as number;
        this.backgroundColor = event.value.color;
      } else {
        newValue = event.target.value as string;
      }
      this.updateTask(value, newValue)
    }
  }else {
    this.alertService.errorAlert("Você não tem permissão para alterar o status")
  }
  }

  updateTask(value: Value, newValue: any): void {
    const valueUpdate: ValueUpdate = {
      id: this.task.id,
      value: {
        property: {
          id: value.property.id
        },
        value: {
          id: value.id,
          value: newValue
        }
      }
    };
    this.taskService.patchValue(valueUpdate).subscribe(
      (task) => {
        this.alertService.successAlert(value.property.name + " alterado com sucesso!");
        this.changes.emit(task);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
