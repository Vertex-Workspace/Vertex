import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/class/task';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(value: Task[], params: any): Task[] {
    console.log('a');
    
    if (!value || !params.value) {
      return value;
    }

    return value;
  }

}
