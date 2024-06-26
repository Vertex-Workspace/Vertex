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
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/class/chat';
import { Team } from 'src/app/models/class/team';
import { Observable } from 'rxjs';
import { SentToReview } from 'src/app/models/class/review';
import { ReviewService } from 'src/app/services/review.service';
import { LoadingService } from 'src/app/services/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { TaskResponsable } from 'src/app/models/class/taskResponsable';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  faClock = faClock;

  @Input() project!: Project;

  @Output() close = new EventEmitter();

  @Output() changes = new EventEmitter();

  @Input() task!: Task;

  @Input() permissions!: Permission[];

  canEdit: boolean = false;

  taskStep!: Task;
  user!: User;
  timeInTask!: TimeInTask;
  hasDependency: boolean = false;

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
  persObservable!: Observable<Permission[]>;

  isSending: boolean = false;


  constructor(private taskService: TaskService,
    private projectService: ProjectService,
    private alertService: AlertService,
    private taskHourService: taskHourService,
    private teamService: TeamService,
    private userService: UserService,
    private loadingService: LoadingService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private reviewService: ReviewService,
    private translate : TranslateService
  ) {

    this.user = userService.getLogged();
    if(!this.task){
      this.requests();
    } else {
      this.aditionalInformations();
    }
  }
  ngOnInit(): void {
    this.taskService.getChatByTaskId(this.task.id).subscribe(
      (chat: Chat) => {
        this.taskChat = chat;
      },
      (error: any) => {
        this.alertService.errorAlert(error.error)
      }
    );
  }

  changed: boolean = false;
  ngOnChanges() {
    let idTask = 0;
    this.activatedRoute.queryParamMap.subscribe((p: any) => {idTask = p['params'].taskID});
    if(!idTask){
      this.changed = true;
      this.requests();
    }
    
  }
  selectedComponent: string = 'description';

  soloResponsable: boolean = false;
  checkedReview: boolean = false;

  permissionsRender!: Observable<Permission[]>;

  render : boolean = false;
  requests() {
    let idTask = 0;
    
    this.activatedRoute.queryParamMap.subscribe((p: any) => {idTask = p['params'].taskID});
    
    if(!idTask && !this.changed){
      return;
    }
    if(!idTask || idTask == 0){
      idTask = this.task.id;
    }

    this.taskService.getOneById(idTask).subscribe(
      (task: Task) => {
        this.task = task;
        this.aditionalInformations();

      }
    , (error) => {
      this.router.navigate(['projeto/' + this.project.id + '/tarefas']);
    });



  }

  public aditionalInformations(){
    if (this.task.revisable) {
      this.checkedReview = true;
    }
    this.taskService.getTaskInfo(this.task.id).subscribe(
      (taskInfo: any) => {
  
        this.taskInfoDTO = taskInfo;
        
        if(!this.project){
          console.log("REQUEST");
          
          this.projectService.getOneById(taskInfo.projectId).subscribe(
            (project: Project) => {
              this.project = project;
              console.log(this.project);
              
            }
          );
        }
        this.task.taskResponsables!.forEach((taskResponsable) => {
          if (taskResponsable.userTeam.user.id == this.user.id) {
            this.idResponsable = taskResponsable.id;
    
            //Validates if the user is the creator of the task
            if (this.task.creator?.user.id == taskResponsable.userTeam.user.id) {
              //The creator doesn't send the task
              this.soloResponsable = true;
            }
          }
        });
        if (this.task.taskResponsables!.length == 1) {
          this.soloResponsable = true;
        }
    
        this.getTimeInTask();
    
          
        this.persObservable = this.taskService.getTaskPermissions(this.task.id, this.user.id!)
    
        this.persObservable.forEach(
          (permissions: Permission[]) => {
            this.permissions = permissions;
            this.setEditPermission(permissions);
          }
        );
      }
    );
    

    //Caso o usuário der F5 na página, o request de encerrar ciclo é feito
    window.onbeforeunload = () => this.ngOnDestroy();

    if (this.task.taskDependency != null) {
      this.hasDependency = true
      this.alertService.successAlert("Lembre-se de terminar a tarefa " + this.task.taskDependency.name + " antes")
    }
    this.taskService.getPDF(this.task.id).subscribe(
      (pdf: any) => {
        this.data = "data:application/pdf;base64,"+pdf; 
      },
      error => {
        console.error('Error downloading PDF:', error);
        this.data = "data:application/pdf;base64,"+error.error.text; 
      }
    );
    this.render = true;
  }

  data : string = "";

  private setEditPermission(permissions: Permission[]) {
    for (const permission of permissions) {
      if ((permission.name === PermissionsType.EDIT) && permission.enabled) {
        this.canEdit = true;
      }
    }
  }

  getTimeInTask() {
    this.taskHourService.getTimeInTask(this.idResponsable).subscribe(
      (time: TimeInTask) => {
        this.timer = time.timeInTask;
        this.seconds = parseInt(time.timeInTask.substring(6, 8));
        this.minutes = parseInt(time.timeInTask.substring(3, 5));
        this.hours = parseInt(time.timeInTask.substring(0, 2));
        this.timeInTask = time;
        if (this.timeInTask.working) {
          this.startTimer()
        }
      });
  }

  navigate(component: string): void {
    this.selectedComponent = component;
  }

  closeModal() {
    if (!this.timeInTask.working) {
      this.close.emit();
    }
  }

  changeTask(event: Task): void {
    this.changes.emit(event);
  }

  updateTaskNameAndDescription(): void {
    if (this.task.name === "") {
      this.task.name = this.translate.instant('pages.tasks.new_task');
    }
  
    if (this.task.description === "") {
      this.task.description = this.translate.instant('pages.tasks.new_task_description');
    }
    if (this.task.description.length > 1000) {
      this.alertService.notificationAlert(this.translate.instant('alerts.notification.descriptionLimit'));
      return;
    }
    if(this.task.name.length < 4){
      this.alertService.errorAlert(this.translate.instant('alerts.error.minTaskLengthName'));
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
        const modeView : any = {
          id: task.id,
          name: task.name,
          image: task.creator?.user.image,
          values: task.values,
          indexTask: task.indexTask
        }
        this.changeTask(modeView);
        this.alertService.successAlert(this.translate.instant("alerts.success.taskUpdated"));
      }
    );
  }

  updateTaskRevisable(): void {
    this.reviewService.setRevisable(this.task.id, this.checkedReview).subscribe(
      (response) => {
        ;
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
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantEditTask"))
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
      (taskHour: taskHour) => { },
      (error: any) => {
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
      (taskHour: taskHour) => { },
      (error: any) => {
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

  cantEdit() {
    if (!this.canEdit) {
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantEditTask"))
    }
  }

  ngOnDestroy() {
    if (this.timeInTask.working) {
      this.stopTimer();
    }
  }

  chatCreated: boolean = false;
  taskChat!: Chat;
  createChat() {

    this.taskService.createChatByTaskId(this.task.id).subscribe(
      (task: Task) => {
        this.chatCreated = true;
        this.task.chatCreated = true;
        this.miniChatOpen = true;
        this.taskChat = task.chat!;
        this.alertService.successAlert(this.translate.instant("alerts.success.chatCreated"));
      },
      (error: any) => {
        this.alertService.errorAlert(error.error)
      }
    );
  }

  sendTask() {
    this.isSending = true;
  }
  isAloneTask() {
    return this.task.taskResponsables!.length <= 1;
  }

  updateTaskChat(chat : Chat){
    this.task.chat = chat;
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
          this.alertService.successAlert(this.translate.instant("alerts.success.taskSentToReview"));
          window.location.reload();
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

  isRevisable(): boolean {
    return this.taskInfoDTO.projectReviewENUM == "OPTIONAL";
  }

  hasDependency2(): void{
    this.hasDependency = true;
  }

}