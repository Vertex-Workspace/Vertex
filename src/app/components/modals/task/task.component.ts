import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PropertyList } from 'src/app/models/property';
import { Task, TaskEdit } from 'src/app/models/task';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';
import { taskHourService } from 'src/app/services/taskHour.service';
import { taskHour } from '../../../models/taskHour';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { TimeInTask } from 'src/app/models/timeInTask';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  faClock = faClock;

  @Output() close = new EventEmitter();

  @Output() changes = new EventEmitter();

  @Input() task!: Task;

  taskStep!: Task;
  user!: User;
  project!: Project;
  timeInTask!: TimeInTask;
  working!: boolean;
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  timer: String = "00:00:00";
  id!: any;
  miniChatOpen: boolean=false;
  chatExpanded: boolean=false;

  constructor(private taskService: TaskService, private projectService: ProjectService, private alertService: AlertService, private taskHourService: taskHourService) { }
  selectedComponent: string = 'description';

  async ngOnInit() {
    await this.getTimeInTask();
    await this.getProject()
    this.working = this.timeInTask.workingOnTask
    if (this.working) {
      this.startTimer()
    }
  }

  async getProject(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.projectService.getOneById(1).subscribe(
        (project: Project) => {
          this.project = project;
          resolve();
        },
        (e: any) => {
          console.log(e.error);
        }
      );
    });
  }

  async getTimeInTask() {
    this.taskHourService.getTimeInTask(this.task.id).subscribe(
      (time: TimeInTask) => {
        this.timer = time.timeInTask;
        this.seconds = parseInt(time.timeInTask.substring(6, 8));
        this.minutes = parseInt(time.timeInTask.substring(3, 5));
        this.hours = parseInt(time.timeInTask.substring(0, 2));
        this.timeInTask = time;
        console.log(time, "TIME-IN BACK");
      },
      (e: any) => {
        console.log(e);
      });
  }

  navigate(component: string): void {
    this.selectedComponent = component;
  }

  async closeModal() {
    this.stopTimer()
    this.close.emit();
  }

  changeTask(event: any): void {
    this.changes.emit(event);
  }

  updateTaskNameAndDescription(): void {
    let taskEdit: TaskEdit = {
      id: this.task.id,
      name: this.task.name,
      description: this.task.description
    };
    if (this.task.name === "") {
      this.task.name = "Nova tarefa";
    }
    if (this.task.description === "") {
      this.task.name = "Insira uma breve descrição sobre a tarefa aqui...";
    }
    this.taskService.edit(taskEdit).subscribe(
      (task: Task) => {
        this.task.name = task.name
        this.task.description = task.description;
        if (task.description.length > 1000) {
          this.alertService.errorAlert("O número máximo de caracteres permitido é 1000, reduza o tamanho da sua");
        }
        this.alertService.successAlert("Tarefa alterada com sucesso!");
      },
      (error: any) => {
        console.log(error);
        
        this.alertService.errorAlert("Máximo de caracteres permitido: 1000. Reduza o tamanho da sua descrição.");
      }
    );
  }

  descriptionEditable: boolean = false;
  changeEditDescription(): void {
    if (this.descriptionEditable) {
      this.updateTaskNameAndDescription();
    }
    this.descriptionEditable = !this.descriptionEditable;
  }


  idResponsable: number = 0;
  startTimer() {
    this.timeInTask.workingOnTask = true;
    this.working = true;
    this.user = JSON.parse(localStorage.getItem('logged')!);
    this.task.taskResponsables!.forEach((taskResponsable) => {
      if (taskResponsable.userTeam.user.id == this.user.id) {
        this.idResponsable = taskResponsable.id;
      }
    });

    let taskHour: taskHour = {
      task: {
        id: this.task.id
      },
      taskResponsable: {
        id: this.idResponsable
      }
    }

    this.id = setInterval(() => {
      this.seconds++;
      if (this.seconds == 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes == 60) {
        this.minutes = 0;
        this.hours++;
      }
      this.timer = `${this.hours < 10 ? '0' + this.hours : this.hours}:${this.minutes < 10 ? '0' + this.minutes : this.minutes}:${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;
    }, 1000);

    this.taskHourService.saveTaskHour(taskHour).subscribe(
      (taskHour: taskHour) => {
        console.log(taskHour, "START TIMER");
      },
      (error: any) => {
        console.log(error);
        this.alertService.errorAlert(error.error)
      }
    );
  }

  async stopTimer() {
    this.working = false;
    this.timeInTask.workingOnTask = false;

    let taskHour: taskHour = {
      task: {
        id: this.task.id
      },
      taskResponsable: {
        id: this.idResponsable
      },
    }

    clearInterval(this.id);

    this.taskHourService.patchTaskHour(taskHour).subscribe(
      (taskHour: taskHour) => {
        console.log(taskHour, "STOP TIMER");
      },
      (error: any) => {
        console.log(error);
        this.alertService.errorAlert(error.error)
      }
    );
  }

  openMiniChat() {
    this.miniChatOpen = !this.miniChatOpen;
  }
  minimizeChat() {
    this.chatExpanded = !this.chatExpanded;
  }

}
