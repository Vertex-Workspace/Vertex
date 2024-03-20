import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/class/task';
import { Property } from '../models/class/property';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {

  transform(value: Task[], filter: string): Task[] {
    if (filter) {
      filter = filter.toUpperCase();

      return value.filter(task => {
        
        // return task.values[0].value.toLocaleUpperCase().indexOf(filter) >= 0
      });
    } else {
      return value;
    }
  }

}
