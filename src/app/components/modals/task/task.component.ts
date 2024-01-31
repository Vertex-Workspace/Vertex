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

  project!: Project;

  step: number = 1;

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  timer: String = "00:00:00";

  id!: any;

  constructor(private taskService: TaskService, private projectService: ProjectService, private alertService: AlertService, private taskHourService: taskHourService) { }
  selectedComponent: string = 'description';


  async ngOnInit() {
    await this.getTimeInTask();
    await this.getProject();
    console.log(this.project);

  }

  async getProject(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.projectService.getOneById(1).subscribe(
        (project: Project) => {
          this.project = project;
          resolve();
        },
        (error: any) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  async getTimeInTask() {
    this.taskHourService.getTimeInTask(1).subscribe(
      (taskHour: String) => {
        this.seconds = parseInt(taskHour.substring(6, 8));
        this.minutes = parseInt(taskHour.substring(3, 5));
        this.hours = parseInt(taskHour.substring(0, 2));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  navigate(component: string): void {
    this.selectedComponent = component;
  }

  closeModal(): void {
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
        this.alertService.successAlert("Tarefa alterada com sucesso!");
      },
      (error: any) => {
        this.alertService.errorAlert("Erro ao alterar tarefa!");
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
    this.step = 2;


    

    this.task.taskResponsables!.forEach((taskResponsable) => {
      //pegar user do localstorage
      // if(taskResponsable.userTeam.user.id == ){
      //   this.idResponsable = taskResponsable.id;
      // }
    });

    console.log(this.task);
    

    let taskHour: taskHour = {
      task: {
        id: this.task.id
      },
      taskResponsable: {
        id: this.idResponsable
      }
    }

    console.log(taskHour);
    

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
        console.log(taskHour);
      },
      (error: any) => {
        console.log(error);
      }
    );


  }

  stopTimer() {

    let taskHour: taskHour = {
      task: {
        id: this.idResponsable
      },
      taskResponsable: {
        id: this.idResponsable
      },

    }


    clearInterval(this.id);

    this.taskHourService.patchTaskHour(taskHour).subscribe(
      (taskHour: taskHour) => {
        console.log(taskHour);
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.step = 1;

  }
}
