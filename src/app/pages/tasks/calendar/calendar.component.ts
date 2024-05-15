import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleUser, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/models/class/project';
import { PropertyKind, PropertyList } from 'src/app/models/class/property';
import { Task, TaskCreate } from 'src/app/models/class/task';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { ValueUpdate } from 'src/app/models/class/value';
import { PipeParams } from 'src/app/models/interface/params';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
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
  @Input() permissions!: Permission[];
  day: any;

  date: any;


  @Input()
  orderParams !: PipeParams;

  canCreate: boolean = false;
  canEdit: boolean = false

  @Input()
  nameFilter !: string;

  @Input()
  filter !: any;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private translate : TranslateService,
    private alert: AlertService,
  private projectService: ProjectService) {
  }

  ngOnInit() {  
    for (const permission of this.permissions) {
      if ((permission.name === PermissionsType.EDIT) && permission.enabled) {
        this.canEdit = true;
      }else if ((permission.name === PermissionsType.CREATE) && permission.enabled) {
        this.canCreate = true;
      }
    }
    this.buildCalendar();
  }

  plus: boolean = false;

  modalTasks: boolean = false;

  @Output() openTaskDetails = new EventEmitter();
  openCardTask(task: Task): void {
    this.openTaskDetails.emit(task);
  }

  //FUTURE 
  buttonDay!: Date;
  showAdd(day: Date): void {
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

  tasks !: Task[];

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

  delete(task: Task) {
    this.taskService
      .delete(task.id!)
      .subscribe();
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
    this.groupCalendarDays();
  }

  changeMonth(offsetMes: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + offsetMes);
    this.currentDate = new Date(this.currentDate.getTime());
    this.buildCalendar();
  }

  translateMonth(index: number): string {
    
    const monthKey = 'pages.tasks.calendar.months.' + index;
    return this.translate.instant(monthKey);
  }
  translateDayOfWeek(index: number): string {
    const dayKey = 'pages.tasks.calendar.days.' + index;
    return this.translate.instant(dayKey);
  }

  today(day: Date): boolean {
    let date: Date = new Date();
    return date.getDate() == day.getDate() &&
      date.getMonth() == day.getMonth()
      && date.getFullYear() == day.getFullYear();
  }

  weeks!: Date[][];

  groupCalendarDays() {
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    this.calendarDays.forEach((day, index) => {
      currentWeek.push(day);

      if (currentWeek.length === 7 || index === this.calendarDays.length - 1) {
        weeks.push([...currentWeek]); ''
        currentWeek = [];
      }
    });

    this.weeks = weeks;
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
            color = valuePropertyList.color;
        }
      }
    );
    return color!;
  }


  //Create a new task in the project according the day was clicked
  newTaskOnDay(day: Date) {
    if (this.canCreate) {
      let taskCreate: TaskCreate = {
        name: this.translate.instant('pages.tasks.new_task'),
        description: this.translate.instant('pages.tasks.new_task_description'),
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
          this.patchValue(task, day);
          this.openCardTask(task);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.alert.errorAlert(this.translate.instant('alerts.error.nopermission_to_create_task'));
    }

  }

  deleteTask(task: Task): void {
    this.project.tasks = this.project.tasks.filter(taskToDelete => taskToDelete.id !== task.id);
    this.alert.successAlert(this.translate.instant('alerts.success.task_deleted'));
  }
  
  drop(e: CdkDragDrop<any>, day: Date): void {
    const task: Task = e.item.data;
    let property: any;
    if (this.canEdit) {
      task.values.forEach((prop) => {
        if (prop.property.kind === PropertyKind.DATE) {
          this.changeIndex(new Date(prop.value as Date), day, e.previousIndex, e.currentIndex);
          prop.value = day;
          property = prop;
        }
      });
      this.patchValue(task, day);
      this.projectService.updateIndex(this.project.id!, this.project.tasks).subscribe(
        (task: Task[]) => {
          this.project.tasks = task;
        }, error => {
        }
      );
    } else {
      this.alert.errorAlert(this.translate.instant('alerts.error.permission_to_edit_properties'));
    }
  }

  private changeIndex(oldDate: Date, newDate: Date, previousIndex : number, currentIndex: number){
    let initialIndex;
    let finalIndex;
    console.log(oldDate);
    
    if(oldDate.getDate() == newDate.getDate() 
      && oldDate.getMonth() == newDate.getMonth() 
    && oldDate.getFullYear() == newDate.getFullYear()){
      initialIndex = this.project.tasks.indexOf(this.getTasksByDate(newDate)[previousIndex]);
      finalIndex = this.project.tasks.indexOf(this.getTasksByDate(newDate)[currentIndex]);
    } else {
      initialIndex = this.project.tasks.indexOf(this.getTasksByDate(oldDate)[previousIndex]);
      finalIndex = this.project.tasks.indexOf(this.getTasksByDate(newDate)[currentIndex]);
    }
    moveItemInArray(this.project.tasks, initialIndex, finalIndex);
  }
  
  patchValue(task: Task, day: Date): void {
    if (this.canEdit) {
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
                value: day.toISOString().slice(0, -1)
              }
            },
            userID: this.userService.getLogged().id!
          };
  
          this.taskService.patchValue(valueUpdate).subscribe(
            (taskDate) => {
              task.values = taskDate.values;
              this.alert.successAlert(this.translate.instant('alerts.success.date_updated'));
            },
            (error) => {
              console.log(error);
              this.alert.errorAlert(this.translate.instant('alerts.error.update_date'));
            }
          );
        }
      });
    }
  }

  //DRAG AND DROP
  drag(task: Task): void {
    console.log(task);
  }

  hoveringDay: Date | null = null;

  hover(day: Date) {
    this.hoveringDay = day;
  }

}