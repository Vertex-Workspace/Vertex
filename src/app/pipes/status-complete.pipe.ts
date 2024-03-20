import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/class/task';
import { Property, PropertyList } from '../models/class/property';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {

  transform(value: Task[], filter: any, project: boolean): Task[] {
    if (!project && filter) {
    
        const index: number = filter.index;
        filter = filter.name;
        
        return value.filter((task: Task) => {
          const taskValue = task.values[index];
          let value;
          if (taskValue.value) {
            value = taskValue.value as PropertyList;
            value = value.value; 
          }
          
          return filter === value;
        });
    }
    return value;
  }

}
