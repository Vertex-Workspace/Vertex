import {CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {

  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;

  ngOnInit() {
    this.buildCalendar();
  }

  //TASKS
  tasks: any[] = [
    { "name": "teste", date: new Date() },
    { "name": "teste", date: new Date() },
    { "name": "teste", date: new Date() },
    { "name": "teste2", date: new Date(2023, 10, 4) },
    { "name": "teste4", date: new Date(2023, 10, 4) },
    { "name": "teste5", date: new Date(2023, 10, 4) },
    { "name": "teste", date: new Date(2023, 10, 4) },
    { "name": "teste7", date: new Date(2023, 10, 4) },
    { "name": "teste", date: new Date(2023, 10, 4) },
    { "name": "teste", date: new Date(2023, 10, 4) },
    { "name": "teste", date: new Date(2023, 10, 25) },
    { "name": "teste", date: new Date(2023, 10, 25) },
    { "name": "teste", date: new Date(2023, 10, 25) },
    { "name": "teste", date: new Date(2023, 10, 25) },
    { "name": "teste", date: new Date(2023, 10, 13) },
    { "name": "teste", date: new Date(2023, 10, 13) },
    { "name": "teste", date: new Date(2023, 10, 13) },
    { "name": "teste", date: new Date(2023, 10, 13) },
    { "name": "teste", date: new Date(2023, 10, 13) },
    { "name": "teste", date: new Date(2023, 10, 13) },
  ];

  modalTasks: boolean = false;
  modalDate?: Date;
  openModalTasks(date: Date | null): void {
    if (date != null) {
      this.modalDate = date;
    } else {
      this.modalDate = undefined;
    }
    this.modalTasks = !this.modalTasks;
  }

  getTasksByDate(date: Date | undefined): any[] {
    if (date != undefined) {
      let tasks: any[] = [];
      this.tasks.forEach((task) => {
        if (task.date.getDate() == date.getDate() 
        && task.date.getMonth() == date.getMonth()
        && task.date.getFullYear() == date.getFullYear()) {
          tasks.push(task);
        }
      });
      return tasks;
    }
    return [];
  }


  formatDate(day: Date | undefined): string {
    if (day != undefined) {
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return day.toLocaleDateString('pt-BR', options);
    }
    return "";
  }


  //CALENDAR
  currentDate: Date = new Date();
  calendarDays: Date[] = [];
  buildCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const initialDate = new Date(year, month, 1);
    while (initialDate.getDay() !== 0) {
      initialDate.setDate(initialDate.getDate() - 1);
    }
    const finalDate = new Date(year, month + 1, 0);
    while (finalDate.getDay() !== 6) {
      finalDate.setDate(finalDate.getDate() + 1);
    }
    this.calendarDays = [];
    for (
      let date = new Date(initialDate.getTime());
      date <= finalDate;
      date.setDate(date.getDate() + 1)
    ) {
      this.calendarDays.push(new Date(date.getTime()));
    }
  }
  changeMonth(offsetMes: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + offsetMes);
    this.currentDate = new Date(this.currentDate.getTime());
    this.buildCalendar();
  }
  translateMonth(index: number): string {
    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    if (index == 12) {
      return monthNames[0];
    }
    if (index == -1) {
      return monthNames[11];
    }
    return monthNames[index];
  }
  translateDayOfWeek(index: number): string {
    const dayNames = [
      "DOM", "SEG", "TER", "QUA",
      "QUI", "SEX", "SAB"
    ];
    return dayNames[index];
  }

  today(day: Date): boolean {
    let date : Date = new Date();
    return date.getDate() == day.getDate() &&
    date.getMonth() == day.getMonth()
      && date.getFullYear() == day.getFullYear();
  }

  groupCalendarDays(): Date[][] {
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    this.calendarDays.forEach((day, index) => {
      currentWeek.push(day);

      if (currentWeek.length === 7 || index === this.calendarDays.length - 1) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    return weeks;
  }


  //it will be a request of user option
  toggle: boolean = true;
  toggleCharts(): void {
    this.toggle = !this.toggle;
  }

}
