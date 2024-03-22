import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/models/class/task';

@Pipe({
  name: 'nameSortPipe'
})
export class NameSortPipe implements PipeTransform {

  transform(value: Task[], params: any): Task[] { 
    if (params) {
      if (params.name === 'A-Z') {
        return value.sort((a, b) => a.name.localeCompare(b.name));
      } else if (params.name === 'Z-A') {
        return value.sort((a, b) => b.name.localeCompare(a.name));
      } 
    }
    return value;
  }

}
