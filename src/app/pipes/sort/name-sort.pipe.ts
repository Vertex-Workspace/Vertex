import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/models/class/task';

@Pipe({
  name: 'nameSort'
})
export class NameSortPipe  {

  // transform(value: Task[]): Task[] {
    // return value.sort(sortBy());  
  // }

}
