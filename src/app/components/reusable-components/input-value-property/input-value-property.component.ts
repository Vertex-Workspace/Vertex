import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Property, PropertyKind, PropertyList } from 'src/app/models/property';
import { Task } from 'src/app/models/task';
import { Value, ValueUpdate } from 'src/app/models/value';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-input-value-property',
  templateUrl: './input-value-property.component.html',
  styleUrls: ['./input-value-property.component.scss']
})
export class InputValuePropertyComponent {

  @Output()
  changes = new EventEmitter();

  @Input()
  value!: Value;

  @Input()
  task!: Task;

  selectedCity !: any;

  constructor(private taskService: TaskService, private alertService: AlertService) { }


  getValue(value: Value): string{
    if (value.value === null) {
      if (value.property.kind === PropertyKind.NUMBER) {
        return "0";
      }
      return "Vazio";
    }
    if (value.property.kind === PropertyKind.STATUS) {
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

  change(event: any, value: Value): void {
    const propertyId: number = event.value.id;    
    
    if (value.value !== event.value.id) {
      let newValue: string | number | Date;
      if (value.property.kind === PropertyKind.NUMBER || value.property.kind === PropertyKind.STATUS) {
        newValue = event.value.id as number;
      } else if(value.property.kind === PropertyKind.DATE) {

        let date = new Date(event.target.value as string);

        //SLICE RETIRAR O "Z" NO FINAL
        newValue = date.toISOString().slice(0, -1);
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
