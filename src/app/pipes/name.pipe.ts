import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/class/task';
import { Project } from '../models/class/project';
import { Team } from '../models/class/team';

@Pipe({
  name: 'namePipe'
})
export class NamePipe implements PipeTransform {

  transform(value: any[], filter: string): any[] { // pode receber e retornar task,project,team
    if (filter) {      
      filter = filter.toUpperCase();

      return value.filter(v => {
        return v.name.toLocaleUpperCase().indexOf(filter) >= 0
      });
    } 
    return value;
  
  }

}
