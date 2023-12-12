import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendarDays, faCaretDown, faFont, faListNumeric, faPaperclip, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { Property, PropertyKind, PropertyList } from 'src/app/models/property';
import { Task } from 'src/app/models/task';
import { Value, ValueUpdate } from 'src/app/models/value';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  @Input() task!: Task;

  constructor(private taskService: TaskService) { }

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

  }

  @Output() changes = new EventEmitter();

  getValue(value: Value): string {
    if (value.value === null) {
      if(value.property.kind === PropertyKind.DATE){

      }
      if(value.property.kind === PropertyKind.NUMBER){
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
    let newValue: string | number;
    if(value.property.kind === PropertyKind.NUMBER || value.property.kind === PropertyKind.STATUS){
      newValue = event.target.value as number;
    } else {
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
    console.log(valueUpdate);
    this.taskService.patchValue(valueUpdate).subscribe(
      (task) => {
        console.log(task);
        this.changes.emit(task);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}