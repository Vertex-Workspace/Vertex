import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/class/task';

@Pipe({
  name: 'propertyPipe'
})
export class SimplePropertyPipe implements PipeTransform {

  transform(value: Task[], filter: any): Task[] {
    if (filter) {
      return value.filter((task: Task) => {
        // const taskValue = task
        console.log(task)
        console.log(filter);
        
        return filter;
        
      })

      
    }

    return value;
  }

}
