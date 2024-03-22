import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Project, ProjectReview } from 'src/app/models/class/project';
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
import { Chat } from 'src/app/models/class/chat';
import { Team } from 'src/app/models/class/team';
import { Observable } from 'rxjs';
import { SentToReview } from 'src/app/models/class/review';
import { ReviewService } from 'src/app/services/review.service';

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

  @Input() permissions!: Permission[];

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
  taskInfoDTO: any = {
    teamName: "",
    projectName: "",
    creatorFullName: "",
    email: "",
    projectReviewENUM: ""
  }

  isSending: boolean = false;


  constructor(private taskService: TaskService,
    private projectService: ProjectService,
    private alertService: AlertService,
    private taskHourService: taskHourService,
    private teamService: TeamService,
    private userService: UserService,
    private route: ActivatedRoute,
    ) {}

  selectedComponent: string = 'attachments';

  waitRequest: boolean = false;
  soloResponsable: boolean = false;
  checkedReview: boolean = false;

  async ngOnInit() {
    if(this.task.revisable){
      this.checkedReview = true;
    }
    
    this.taskService.getTaskInfo(this.task.id).subscribe(
      (task: any) => {
        console.log(task);
        
        this.taskInfoDTO = task;
      }
    );
    if (this.permissions) {
      for (const permission of this.permissions) {
        if ((permission.name === PermissionsType.EDIT) && permission.enabled) {
          this.canEdit = true;
        }
      }
    }
    this.user = JSON.parse(localStorage.getItem('logged')!);
    console.log(this.task.taskResponsables!);
    
    this.task.taskResponsables!.forEach((taskResponsable) => {
      if (taskResponsable.userTeam.user.id == this.user.id) {
        this.idResponsable = taskResponsable.id;

        //Validates if the user is the creator of the task
        if(this.task.creator?.user.id == taskResponsable.userTeam.user.id){
          //The creator doesn't send the task
          this.soloResponsable = true;
        }
      }
    });
    
    if(this.task.taskResponsables!.length == 1){
      this.soloResponsable = true;
    }

    this.getTimeInTask();

    //Caso o usuário der F5 na página, o request de encerrar ciclo é feito
    window.onbeforeunload = () => this.ngOnDestroy();
  }


  async getTimeInTask() {
    this.taskHourService.getTimeInTask(this.idResponsable).subscribe(
      (time: TimeInTask) => {
        this.timer = time.timeInTask;
        this.seconds = parseInt(time.timeInTask.substring(6, 8));
        this.minutes = parseInt(time.timeInTask.substring(3, 5));
        this.hours = parseInt(time.timeInTask.substring(0, 2));
        this.timeInTask = time;
        this.waitRequest = true;
        if (this.timeInTask.working) {
          this.startTimer()
        }
      },
      (e: any) => {
        console.log(e);
      });
  }

  navigate(component: string): void {
    this.selectedComponent = component;
  }

  closeModal() {
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
      description: this.task.description,
    };
    this.taskService.edit(taskEdit).subscribe(
      (task: Task) => {
        this.task = task;
        this.alertService.successAlert("Tarefa alterada com sucesso!");
      }
    );
  }

  updateTaskRevisable(): void {
    this.reviewService.setRevisable(this.task.id, this.checkedReview).subscribe(
      (response) => {;
      },
      (error: any) => {
        this.task.revisable = !this.task.revisable;
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
    this.taskService.getChatByTaskId(this.task.id).subscribe(
      (chat: Chat) => {
        this.taskChat = chat;
        this.miniChatOpen = !this.miniChatOpen;
        console.log(this.taskChat, "TASK CHAT");
        
        
      },
      (error: any) => {
        this.alertService.errorAlert(error.error)
      }
    );
  }
  minimizeChat() {
    this.chatExpanded = !this.chatExpanded;
  }

  cantEdit() {
    if (!this.canEdit) {
      this.alertService.errorAlert("Você não tem permissão para editar a tarefa!")
    }
  }

  ngOnDestroy() {
    if (this.timeInTask.working) {
      this.stopTimer();
    }
  }

  chatCreated:boolean = false;
  taskChat!: Chat;
  createChat() {
    
    this.taskService.createChatByTaskId(this.task.id).subscribe(
      (task: Task) => {
        this.chatCreated = true;
        this.task.chatCreated = true;
        this.miniChatOpen = true;
        this.taskChat = task.chat!;
        console.log(this.taskChat, "taskchat");
        this.alertService.successAlert("Chat criado com sucesso!");
      },
      (error: any) => {
        this.alertService.errorAlert(error.error)
      }
    );
  }

  sendTask() {
    this.isSending = true;
  }

  sentToReviewDescription: string = "";
  taskAction(bool: boolean) {
    this.isSending = false;
    if (bool) {
      let taskSentToReview: SentToReview = {
        description: this.sentToReviewDescription,
        userThatSentReview: {
          id: this.idResponsable
        },
        task: {
          id: this.task.id
        }
      }
      this.reviewService.sentToReview(taskSentToReview).subscribe(
        (task: Boolean) => {
          this.project.tasks = this.project.tasks.filter((task) => task.id != this.task.id);
          this.alertService.successAlert("Tarefa enviada para revisão com sucesso!")
          this.closeModal();
        },
        (error: any) => {
          this.alertService.errorAlert(error.error)
        }
      );

    }
  }

  isCreator(): boolean {
    return this.task.creator?.user.id == this.user.id;
  }

  isRevisable(): boolean{
    return this.taskInfoDTO.projectReviewENUM == ProjectReview.OPTIONAL;
  }
}