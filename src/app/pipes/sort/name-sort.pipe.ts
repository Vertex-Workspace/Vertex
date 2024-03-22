import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/models/class/task';
import { PipeParams } from 'src/app/models/interface/params';

@Pipe({
  name: 'nameSortPipe'
})
export class NameSortPipe implements PipeTransform {

  transform(value: Task[], params: PipeParams): Task[] { 
    if (params 
        && params.name 
          && params.type === 'name') {
      
      if (params.name === 'A-Z') {
        return value.sort((a, b) => {
          return a.name.localeCompare(b.name)
        });

      } else if (params.name === 'Z-A') {
        return value.sort((a, b) => {
          return b.name.localeCompare(a.name)
        });
      }
    }
    return value;
  }

}
