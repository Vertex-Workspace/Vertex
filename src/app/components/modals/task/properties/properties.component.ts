import { Component, Input, OnInit } from '@angular/core';
import { faCalendarDays, faCaretDown, faFont, faListNumeric, faPaperclip, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { PropertyKind, PropertyList } from 'src/app/models/property';
import { Task } from 'src/app/models/task';
import { Value } from 'src/app/models/value';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit{

  @Input() task!: Task;

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
    this.selectedOption = this.task.values[0].value as PropertyList;
  }


  getValue(value: Value): string {
    if (value.property.kind === PropertyKind.STATUS) {
      let valueProperty = value.value as PropertyList;
      return valueProperty.value;
    }
    if (value.value === null) {
      return "Vazio";
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

  selectedOption!: PropertyList;
  getSelectOptions(value: Value): PropertyList[] {
    return value.property.propertyLists;
  }

  getKind(value: Value): boolean{
    console.log(value);
    return value.property.kind === PropertyKind.STATUS;
  }
}