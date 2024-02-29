import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/models/class/project';
import { PropertyList } from 'src/app/models/class/property';
import { Task, TaskEdit } from 'src/app/models/class/task';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { taskHourService } from 'src/app/services/taskHour.service';
import { taskHour } from '../../../models/class/taskHour';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from 'src/app/services/project.service';
import { User } from 'src/app/models/class/user';
import { TimeInTask } from 'src/app/models/class/timeInTask';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  faClock = faClock;



  @Input()
  project!: Project;

  @Output() close = new EventEmitter();

  @Output() changes = new EventEmitter();

  @Input() task!: Task;

  canEdit: boolean = false;

  taskStep!: Task;
  user!: User;
  timeInTask!: TimeInTask;

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  timer: String = "00:00:00";
  id!: any;
  miniChatOpen: boolean = false;
  chatExpanded: boolean = false;

  constructor(private taskService: TaskService,
    private projectService: ProjectService,
    private alertService: AlertService,
    private taskHourService: taskHourService,
    private teamService: TeamService,
    private userService: UserService,
    private route: ActivatedRoute) {
    console.log(this.canEdit);

    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService
      .getOneById(id)
      .subscribe((p: Project) => {
        this.project = p;

        this.teamService.hasPermission(id, this.userService.getLogged()).subscribe((permissions: Permission[]) => {
          this.userService.getLogged().permissions = permissions

          for (let i = 0; i < permissions.length; i++) {
            if ((permissions[i].name === PermissionsType.EDIT) && permissions[i].enabled === true) {
              this.canEdit = true;

            }
          }
        })
      })
  }

  selectedComponent: string = 'description';

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('logged')!);
    console.log(this.task.taskResponsables);
    this.task.taskResponsables!.forEach((taskResponsable) => {
      if (taskResponsable.userTeam.user.id == this.user.id) {
        this.idResponsable = taskResponsable.id;
      }
    });
    await this.getTimeInTask();
    if (this.timeInTask.working) {
      this.startTimer()
    }
  }


  async getTimeInTask() {
    this.taskHourService.getTimeInTask(this.idResponsable).subscribe(
      (time: TimeInTask) => {

        this.timer = time.timeInTask;

        this.seconds = parseInt(time.timeInTask.substring(6, 8));
        this.minutes = parseInt(time.timeInTask.substring(3, 5));
        this.hours = parseInt(time.timeInTask.substring(0, 2));
        this.timeInTask = time;
      },
      (e: any) => {
        console.log(e);
      });
  }

  navigate(component: string): void {
    this.selectedComponent = component;
  }

  async closeModal() {
    this.close.emit();
  }

  changeTask(event: any): void {
    this.changes.emit(event);
  }

  updateTaskNameAndDescription(): void {
    if (this.task.name === "") {
      this.task.name = "Nova tarefa";
    }
    if (this.task.description === "") {
      this.task.name = "Insira uma breve descrição sobre a tarefa aqui...";
    }
    if (this.task.description.length > 1000) {
      this.alertService.notificationAlert("O número máximo de caracteres permitido é 1000, reduza o tamanho da sua");
      return;
    }
    let taskEdit: TaskEdit = {
      id: this.task.id,
      name: this.task.name,
      description: this.task.description
    };
    this.taskService.edit(taskEdit).subscribe(
      (task: Task) => {
        this.task = task;
        this.alertService.successAlert("Tarefa alterada com sucesso!");
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
      if (this.descriptionEditable) {
        this.updateTaskNameAndDescription();
      }
    } else {
      this.alertService.errorAlert("Você não tem permissão para editar a tarefa!")
    }
  }

  idResponsable: number = 0;

  startTimer() {
    this.timeInTask.working = true;

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
        console.log(taskHour, "START TIMER");
      },
      (error: any) => {
        console.log(error);
        this.alertService.errorAlert(error.error)
      }
    );
  }

  async stopTimer() {
    this.timeInTask.working = false;

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

  cantEdit(){
    if(!this.canEdit){
      this.alertService.errorAlert("Você não tem permissão para editar a tarefa!")
    } 
  }

  ngOnDestroy() {
    if(this.timeInTask.working){
      this.stopTimer();
    }
  }
}