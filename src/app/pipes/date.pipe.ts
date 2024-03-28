import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/class/task';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(value: Task[], params: any): Task[] {
    if (!params || !params.value || !value || value.length === 0) {
      return value;
    }

    const filterValue = params.value.trim().toLowerCase();

    const currentDate = new Date();

    return value.filter(task => {
      const taskDate = new Date(String(task.values[1].value));

      if (filterValue === 'td') {
        return this.isSameDate(taskDate, currentDate);
      } else if (filterValue === 'nw') {
        const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        return taskDate > currentDate && taskDate <= nextWeek;
      } else if (filterValue === 'nm') {
        const nextMonthEnd = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Adiciona 30 dias a partir da data atual
        return taskDate > currentDate && taskDate <= nextMonthEnd;
      } else {
        return true;
      }
    });
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}
