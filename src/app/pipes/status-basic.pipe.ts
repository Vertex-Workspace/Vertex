import { Pipe, PipeTransform } from '@angular/core';
import { PropertyList } from '../models/class/property';
import { Task } from '../models/class/task';
import { Value } from '../models/class/value';

@Pipe({
  name: 'statusBasicPipe'
})
export class StatusBasicPipe implements PipeTransform {

  transform(value: Task[], filter: any, project: boolean): Task[] {
    if (project && filter) {
        filter = filter.kind;
        
        return value.filter((task: Task) => {  
          const value = task.values[0].value as PropertyList;
           
          return filter === value.propertyListKind;
        });
    }
    return value;
  }

}
