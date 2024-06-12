import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/class/task';
import { Project } from '../models/class/project';
import { Team } from '../models/class/team';
import { User } from '../models/class/user';

@Pipe({
  name: 'usernamePipe'
})
export class UsernamePipe implements PipeTransform {

  transform(value: User[], filter: string): User[] {
    if (filter) {      
      filter = filter.toUpperCase();

      return value.filter(v => {
        return v.firstName!.toLocaleUpperCase().indexOf(filter) >= 0 
            || v.lastName!.toLocaleUpperCase().indexOf(filter) >= 0
                || v.email.toLocaleUpperCase().indexOf(filter) >= 0
                    || (`${v.firstName} ${v.lastName}`).toLocaleUpperCase().indexOf(filter) >= 0
      });
    } 
    return value;
  
  }

}