import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/class/task';

@Pipe({
  name: 'namePipe'
})
export class NamePipe implements PipeTransform {

  transform(value: Task[], filter: string): Task[] {
    if (filter) {      
      filter = filter.toUpperCase();

      return value.filter(task => {
        return task.name.toLocaleUpperCase().indexOf(filter) >= 0
      });
    } 
    return value;
  
  }

}
