import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/models/project';
import { PropertyList } from 'src/app/models/property';
import { Task, TaskEdit } from 'src/app/models/task';
import { Permission, PermissionsType } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Output() close = new EventEmitter();

  @Output() changes = new EventEmitter();

  @Input() task!: Task;
  @Input() project !: Project;

  canEdit: boolean = false;

  constructor(private taskService: TaskService,
    private alertService: AlertService,
    private teamService: TeamService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.teamService.hasPermission(this.project, this.userService.getLogged()).subscribe((permissions: Permission[]) => {
      this.userService.getLogged().permissions = permissions

      for (let i = 0; i < permissions.length; i++) {
        if ((permissions[i].name === PermissionsType.EDIT) && permissions[i].enabled === true) {
          this.canEdit = true;
        }
      }
    })

  }

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
          console.log(2);
          
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
    if (this.canEdit) {
      if (this.descriptionEditable) {
        this.updateTaskNameAndDescription();
      }
      this.descriptionEditable = !this.descriptionEditable;
    }else {
      this.alertService.errorAlert("Você não tem permissão para editar a tarefa!")
    }
  }

}