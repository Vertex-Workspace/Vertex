import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PropertyList } from 'src/app/models/property';
import { Task, TaskEdit } from 'src/app/models/task';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Output() close = new EventEmitter();

  @Output() changes = new EventEmitter();

  @Input() task!: Task;

  constructor(private taskService : TaskService, private alertService : AlertService) { }
  selectedComponent: string = 'description';

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
    if(this.descriptionEditable){
      this.updateTaskNameAndDescription();
    }
    this.descriptionEditable = !this.descriptionEditable;
  }

}