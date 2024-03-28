import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/models/class/task';
import { PipeParams } from 'src/app/models/interface/params';

@Pipe({
  name: 'dateSortPipe'
})
export class DateSortPipe implements PipeTransform {

  transform(value: Task[], params: PipeParams): Task[] {
    if (params 
      && params.name 
        && params.type === 'date') {

          if (params.name === 'Menor - Maior') {
            return value.sort((a, b) => {
              const aValue = String(a.values[1].value);
              const bValue = String(b.values[1].value);          
              return aValue.localeCompare(bValue)
            });
    
          } else if (params.name === 'Maior - Menor') {
            
            return value.sort((a, b) => {
              const aValue = String(a.values[1].value);
              const bValue = String(b.values[1].value);
              return bValue.localeCompare(aValue)
            });
          }
        
    }
    return value;
  }

}
