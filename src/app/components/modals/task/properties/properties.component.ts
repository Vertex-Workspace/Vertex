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

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

  @Input() task!: Task;
  @Input() project !: Project
  @Input() permissions !: Permission[];

  tasks: Task[] = []

  faUsers = faUsers
  faListCheck = faListCheck

  constructor(private taskService: TaskService,
    private projectService: ProjectService,
    private alertService: AlertService,
    private teamService: TeamService,
    private userService: UserService) { }

  icons: any = [
    { name: 'TEXT', icon: faFont },
    { name: 'DATE', icon: faCalendarDays },
    { name: 'LIST', icon: faCaretDown },
    { name: 'STATUS', icon: faSpinner },
    { name: 'RESPONSABLE', icon: faUser },
    { name: 'LINK', icon: faPaperclip },
    { name: 'NUMBER', icon: faListNumeric },
  ]


  canEdit: boolean = false;
  taskResponsables: TreeNode[] = []
  selectedUsers: TreeNode[] = []
  selectedUsers2: TreeNode[] = []
  taskDependency: Task[] = []
  selectedDependency !: string
  differentDone !: boolean

  ngOnInit(): void {
    this.tasks = this.project.tasks
    this.getGroups()
    this.getUsers()

    for (const permission of this.permissions) {
      if (permission.name === PermissionsType.EDIT && permission.enabled) {
        this.canEdit = true;
      }
    }

    for (const task of this.project.tasks) {
      if (this.task.id != task.id) {
        this.taskDependency.push(task)
      }
    }
    if (this.task.taskDependency != null) {
      this.selectedDependency = this.task.taskDependency.name;
    } else {
      this.selectedDependency = 'Selecione dependência'
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

  removeCircularReferences(obj: any): any {
    const seen = new WeakSet();
    const replacer = (key: string, value: any) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
    return JSON.parse(JSON.stringify(obj, replacer));
  }

  updateResponsible(event: any, node: any): void {
    let isGroup: boolean = false

    if (event instanceof Group) {
      isGroup = true
    } else if (event instanceof User) {
      isGroup = false
    }

    let taskResponsibles: UpdateResponsibles = {
      taskId: this.task.id,
      teamId: this.project.idTeam,
      user: isGroup ? null : node,
      group: isGroup ? node : null
    };

    taskResponsibles = this.removeCircularReferences(taskResponsibles);

    if (taskResponsibles.user != null) {
      if (this.task.creator?.user.id != taskResponsibles.user.id) {
        this.taskService.updateTaskResponsables(taskResponsibles).subscribe((task: Task) => {
          this.alertService.successAlert("editado")
        });
      } else {
        this.alertService.errorAlert("Você não pode remover o criador da tarefa")
      }
    } else {
      this.taskService.updateTaskResponsables(taskResponsibles).subscribe((task: Task) => {
        this.alertService.successAlert("editado")
      });
    }
  }

  setTaskDependencies(task: any) {
    console.log(task.value);
    this.taskService.taskDependency(this.task.id, task.value.id, this.task).subscribe((task1: Task) => {
      this.alertService.successAlert("Essa tarefa agora necessita da conclusão da tarefa " + task.name)
      this.selectedDependency = task.value.name
    },
      (error) => {
        this.alertService.errorAlert("Já existe uma tarefa que depende dessa")
      })

  }

  users1: User[] = []
  getUsers() {
    this.projectService.returnAllCollaborators(this.project.id).subscribe((pc: ProjectCollaborators) => {
      for (const user of pc.users) {
        user.label = user.firstName
        this.taskResponsables.push(user)
        this.taskService.returnAllResponsables(this.task.id).subscribe((tr: ReturnTaskResponsables) => {
          this.selectedUsers2 = tr.users
          for (const user1 of tr.users) {
            user1.label = user1.firstName
            if (user.id === user1.id) {
              this.selectedUsers.push(user)
            }
          }
        })
      }
    })
  }

  getGroups() {
    this.projectService.returnAllCollaborators(this.project.id).subscribe((pc: ProjectCollaborators) => {
      for (const group1 of pc.groups) {
        let group: Group = group1 as Group
        group.label = "Grupo " + group.name
      
        this.taskResponsables.push(group)
 
        this.taskService.returnAllResponsables(this.task.id).subscribe((tr: ReturnTaskResponsables) => {
          for (const group of tr.groups) {
            if (group.id == group1.id) {
              this.selectedUsers.push(group1 as Group)
            }
          }
        })
      }
    })     
  }


  // taskDone: Task[] = []
  // public tasksDone() {
  //   let propertyList: PropertyList;
  //   for (const task of this.project.tasks) {
  //     for (const value of task.values) {
  //       propertyList = value.value as PropertyList

  //       if(propertyList.propertyListKind === PropertyListKind.DONE){
  //         this.taskDone.push(task)
  //       }

  //     }
  //   }
  // }

}