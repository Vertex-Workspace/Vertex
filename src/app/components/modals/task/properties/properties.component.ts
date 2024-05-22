import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faCalendarDays, faCaretDown, faFont, faListNumeric,
  faPaperclip, faSpinner, faUser, faUsers, faListCheck
} from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { Group } from 'src/app/models/class/groups';
import { Project, ProjectCollaborators } from 'src/app/models/class/project';
import { Property, PropertyKind, PropertyList, PropertyListKind } from 'src/app/models/class/property';
import { ReturnTaskResponsables, Task, UpdateResponsibles } from 'src/app/models/class/task';
import { Permission, PermissionsType, User } from 'src/app/models/class/user';
import { Value, ValueUpdate } from 'src/app/models/class/value';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { LogComponent } from '../log/log.component';
import { ReturnStatement } from '@angular/compiler';
import { TreeNode } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from 'src/app/services/loading.service';
import { Chat } from 'src/app/models/class/chat';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

  @Input() task!: Task;
  @Input() project !: Project

  tasks: Task[] = []

  faUsers = faUsers
  faListCheck = faListCheck

  constructor(private taskService: TaskService,
    private projectService: ProjectService,
    private alertService: AlertService,
    private teamService: TeamService,
    private loadingService: LoadingService,
    private userService: UserService,
    private translate: TranslateService) {
  }

  icons: any = [
    { name: 'TEXT', icon: faFont },
    { name: 'DATE', icon: faCalendarDays },
    { name: 'LIST', icon: faCaretDown },
    { name: 'STATUS', icon: faSpinner },
    { name: 'RESPONSABLE', icon: faUser },
    { name: 'LINK', icon: faPaperclip },
    { name: 'NUMBER', icon: faListNumeric },
  ]


  @Input() canEdit: boolean = false;
  taskResponsables: TreeNode[] = []
  selectedUsers: TreeNode[] = []
  selectedUsers2: TreeNode[] = []
  taskDependency: Task[] = []
  selectedDependency !: string
  differentDone !: boolean
  isCreator: boolean = false;


  ngOnInit(): void {
    this.loadingService.hide();
    if (this.task) {
      if (this.task.creator?.user.id == this.userService.getLogged().id) {
        this.isCreator = true;
      }
    }
    if (this.isCreator) {
      this.tasks = this.project.tasks
      // this.getGroups()
      this.getUsers()

      for (const task of this.project.tasks) {
        if (this.task.id != task.id) {
          this.taskDependency.push(task)
        }
      }
      if (this.task.taskDependency != null) {
        this.selectedDependency = this.task.taskDependency.name;
      } else {
        this.selectedDependency = 'Dependência'
      }
    }
  }

  @Output() changes = new EventEmitter();

  changeTask(event: Task): void {
    this.changes.emit(event);
  }

  getIcon(value: Value): any {
    for (let icon of this.icons) {
      if (icon.name === value.property.kind) {
        return icon.icon;
      }
    }
  }

  getColor(value: Value): string {
    if (value.property.kind === PropertyKind.STATUS || value.property.kind === PropertyKind.LIST) {
      let valuePropertyList: PropertyList = value.value as PropertyList;
      if (valuePropertyList != null) {
        return valuePropertyList.color;
      }
    }
    return "";
  }

  @Input() chatP!: Chat;
  updateResponsible(event: any, node: any): void {
    let isGroup: boolean = false

    if (node && typeof node.label === 'string' && node.label.startsWith('Grupo')) {
      isGroup = true;
    } else {
      isGroup = false;
    }

    console.log(node);
    

    let taskResponsibles: UpdateResponsibles = {
      taskId: this.task.id,
      teamId: this.project.idTeam,
      user: isGroup ? null : node,
      group: isGroup ? node : null
    };

    // this.teamService.patchChat(this.chatP.id!, this.project.idTeam, node.id).subscribe(
    //   (res:any) => {
    //     this.alertService.successAlert(this.translate.instant("alerts.success.chat-responsibles"))
    //     this.chatP = res;
        
    //     console.log(res.userTeams, "USER TEAMS");
        
    //   },
    //   (error) => {
    //     this.alertService.errorAlert("Erro ao adicionar usuário ao chat")
    //     console.log(error);
    //   }
    // );

    if (taskResponsibles.group) {
      taskResponsibles.group.tasks = []
      taskResponsibles.group.projects = []
    }

    let idUser: number = taskResponsibles.user?.id ?? 0;
    let idTeam = taskResponsibles.teamId;

    if ((taskResponsibles.user != null) && (this.task.creator?.user.id != taskResponsibles.user.id)) {
      this.taskService.updateTaskResponsables(taskResponsibles).subscribe((task: Task) => {
        this.alertService.successAlert(this.translate.instant("alerts.success.task-responsibles")
        )
      });
    } else {
      this.alertService.errorAlert("Você não pode remover o criador da tarefa")
    }
  }

  setTaskDependencies(task: any) {
    this.taskService.taskDependency(this.task.id, task.value.id, this.task).subscribe((task1: Task) => {
      this.alertService.successAlert(this.translate.instant("alerts.success.dependency") + task.value.name)
      this.selectedDependency = task.value.name
    },
      (error) => {
        this.alertService.errorAlert("Já existe uma tarefa que depende dessa")
      })

  }

  getUsers() {
    this.projectService.returnAllCollaborators(this.project.id).subscribe((pc: ProjectCollaborators) => {
      for (const user of pc.users) {
        user.label = user.firstName
        if (this.task.creator?.user.id != user.id) {
          this.taskResponsables.push(user)
          this.returnAllUsers(user)
        }
      }
    })
  }

  returnAllUsers(user: User) {
    this.taskService.returnAllResponsables(this.task.id).subscribe((tr: ReturnTaskResponsables) => {
      for (const user1 of tr.users) {
        if (user.id === user1.id) {
          this.selectedUsers.push(user)
        }
      }
    })
  }

  // getGroups() {
  //   this.projectService.returnAllCollaborators(this.project.id).subscribe((pc: ProjectCollaborators) => {
  //     for (const group1 of pc.groups) {
  //       let group: Group = group1 as Group
  //       group.label = "Grupo " + group.name
  //       this.taskResponsables.push(group)
  //       this.returnAllGroups(group)


  //     }
  //   })
  // }

  // returnAllGroups(group1: Group) {
  //   this.taskService.returnAllResponsables(this.task.id).subscribe((tr: ReturnTaskResponsables) => {
  //     for (const group of tr.groups) {
  //       if (group.id == group1.id) {
  //         this.selectedUsers.push(group1)
  //       }
  //     }
  //   })
  // }
}