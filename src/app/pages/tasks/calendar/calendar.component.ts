import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircleUser, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { PropertyKind, PropertyList } from 'src/app/models/property';
import { Task, TaskCreate } from 'src/app/models/task';
import { ValueUpdate } from 'src/app/models/value';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {

  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faCircleUser = faCircleUser;

  @Input() project!: Project;
  day: any;

  constructor(private taskService: TaskService, private userService: UserService) { }

  ngOnInit() {
    this.buildCalendar();
  }

  plus : boolean = false;
  
  modalTasks: boolean = false;



  @Output() openTaskDetails = new EventEmitter();
  openCardTask(task: Task): void {
    this.openTaskDetails.emit(task);
  }


  //FUTURE 
  buttonDay!: Date;
  showAdd(day : Date): void{
    this.buttonDay = day;
    console.log(this.buttonDay);
  }

  modalDate?: Date;
  openModalTasks(date: Date | null): void {
    if (date != null) {
      this.modalDate = date;
    } else {
      this.modalDate = undefined;
    }
    this.modalTasks = !this.modalTasks;
  }

  getTasksByDate(date: Date | undefined): Task[] {
    let tasks: Task[] = [];
    if (date != undefined) {
      this.project.tasks.forEach((task) => {
        task.values.forEach((value) => {
          if (value.property.kind === PropertyKind.DATE) {
  
            let valuePropertyDate: Date = new Date(value.value as string);
            if (valuePropertyDate.getDate() == date.getDate()
              && valuePropertyDate.getMonth() == date.getMonth()
              && valuePropertyDate.getFullYear() == date.getFullYear()) {
              tasks.push(task);
            }
          }
        });
      });
    }
    return tasks;
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
    let date: Date = new Date();
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

  //Temporary
  getColor(task: Task): string {
    let color: string;
    task.values.forEach(
      (value) => {
        if (value.property.kind === PropertyKind.STATUS) {
            let valuePropertyList: PropertyList = value.value as PropertyList;
            if (valuePropertyList.color === "RED") {
              color = "#FF9D9D50";
            } else if (valuePropertyList.color === "YELLOW") {
              color = "#FFD60035";
            } else if (valuePropertyList.color === "GREEN") {
              color = "#65D73C50";
            }
        }
      }
    );
    return color!;
  }


  //Create a new task in the project according the day was clicked
  newTaskOnDay(day: Date) {
    let taskCreate: TaskCreate = {
      name: "Nova Tarefa",
      description: "Descreva um pouco sobre sua Tarefa Aqui",
      project: {
        id: this.project.id!
      },
      values: [],
      creator: {
        id: this.userService.getLogged().id!
      },
      teamId: this.project.idTeam!
    }


  
    this.taskService.create(taskCreate).subscribe(
      (task) => {
        this.project.tasks.push(task);

        task.values.forEach((value) => {
          if (value.property.kind === PropertyKind.DATE) {
            const valueUpdate: ValueUpdate = {
              id: task.id,
              value: {
                property: {
                  id: value.property.id
                },
                value: {
                  id: value.id,
                  //SLICE RETIRAR O "Z" NO FINAL
                  value: day.toISOString().slice(0, -1)
                }
              }
            };
            console.log(valueUpdate);
            this.taskService.patchValue(valueUpdate).subscribe(
              (taskDate) => {
                task.values = taskDate.values;
                this.openCardTask(task);
              },
              (error) => {
                console.log(error);
              }
            );
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );

  }

  deleteTask(task: Task): void {
    this.project.tasks = this.project.tasks.filter(taskdaje => taskdaje.id != task.id);
  }

  //DRAG AND DROP
  drag(task : Task): void {
    console.log(task);
  }
}
