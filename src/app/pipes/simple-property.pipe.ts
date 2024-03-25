import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/class/task';
import { FilterParams } from '../models/interface/filter-params';

@Pipe({
  name: 'simplePropertyPipe',
  pure: false
})
export class SimplePropertyPipe implements PipeTransform {

  transform(value: Task[], params: FilterParams): Task[] {
    if (params) {

      if (params.value && params.propKind === 'TEXT' 
      || params.propKind === 'NUMBER') {
        return value.filter((t: Task) => {
          const value = t.values.find(v => {
            return v.property.id === params.propId;
          });
          
          if (value && value.value) return value.value === params.value; 
        })
      }
    }
    return value;
  }

}
