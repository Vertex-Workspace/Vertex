import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendarDays, faCaretDown, faFont, faListNumeric, faPaperclip, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Property, PropertyKind, PropertyList } from 'src/app/models/property';
import { Task } from 'src/app/models/task';
import { Permission, PermissionsType } from 'src/app/models/user';
import { Value, ValueUpdate } from 'src/app/models/value';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  @Input() task!: Task;
  @Input() project !:Project
  canEdit: boolean = false;

  constructor(private taskService: TaskService, 
    private alertService : AlertService,
    private teamService: TeamService,
    private userService: UserService) { }

  icons: any = [
    { name: 'TEXT', icon: faFont },
    { name: 'DATE', icon: faCalendarDays },
    { name: 'LIST', icon: faCaretDown },
    { name: 'STATUS', icon: faSpinner },
    { name: 'RESPONSABLE', icon: faUser },
    { name: 'LINK', icon: faPaperclip },
    { name: 'NUMBER', icon: faListNumeric },
  ]

  ngOnInit(): void {
    this.teamService.hasPermission(this.project, this.userService.getLogged()).subscribe((permissions: Permission[]) => {
      this.userService.getLogged().permissions = permissions

      for (let i = 0; i < permissions.length; i++) {
        if ((permissions[i].name === PermissionsType.EDIT) && permissions[i].enabled === true) {
          this.canEdit = true;
        }
      }
    })
  }

  @Output() changes = new EventEmitter();
  date!: Date;


  getValue(value: Value): string {
    if (value.value === null) {
      if (value.property.kind === PropertyKind.DATE) {

      }
      if (value.property.kind === PropertyKind.NUMBER) {
        return "0";
      }
      return "Vazio";
    }
    if (value.property.kind === PropertyKind.STATUS) {
      let valueProperty = value.value as PropertyList;
      return valueProperty.value;
    }
    return value.value as string;
  }


  getIcon(value: Value): any {
    for (let icon of this.icons) {
      if (icon.name === value.property.kind) {
        return icon.icon;
      }
    }
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

  change(event: any, value: Value): void {
    console.log(event.target.value);
    if (value.value !== event.target.value) {

      let newValue: string | number | Date;
      if (value.property.kind === PropertyKind.NUMBER || value.property.kind === PropertyKind.STATUS) {
        newValue = event.target.value as number;
      }
      else {
        newValue = event.target.value as string;
      }
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
          this.alertService.successAlert( value.property.name  +  " alterado com sucesso!");
          this.changes.emit(task);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}