import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PropertyList } from 'src/app/models/property';
import { Task, TaskEdit } from 'src/app/models/task';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { TaskHourService } from 'src/app/services/taskHour.service';
import { TaskHourModel } from 'src/app/models/taskHour';
import { taskList } from '../../../pages/tasks/data-test';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Output() close = new EventEmitter();

  @Output() changes = new EventEmitter();

  @Input() task!: Task;
  faClock = faClock;
  faPause = faPause;

  constructor(private taskService: TaskService, private taskHourService: TaskHourService, private alertService: AlertService) { }

  selectedComponent: string = 'description';
  initiated: boolean = true;

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

  startTimer(): void {
    this.initiated = true;

    let date = new Date();
    let dateFormated = date.toISOString();

    const newtaskHour: TaskHourModel = {
      id: 0,
      initialDate: dateFormated,
      finalDate: dateFormated,
      taskResponsable: {
        id: 1
      },
      task: {
        id: this.task.id
      },
      timeSpent: "00:00:00"
    }

    this.taskHourService.saveCurrentDate(newtaskHour).subscribe(
      (hour: any) => {

      },
      (error) => {
        console.error('Erro ao salvar TaskHour:', error);
      }
    );

  }

  getTimeSpent(): any {
   
    this.taskHourService.getTimeInTask(this.task.id).subscribe(
      (hour: any) => {
        return hour;
      },
      (error) => {
        console.error('Erro ao salvar TaskHour:', error);
      }
    );
  }

  stopTimer(): void {
    this.initiated = false;
  }

}