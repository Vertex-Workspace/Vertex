import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendarDays, faCaretDown, faFont, faListNumeric, 
  faPaperclip, faSpinner, faUser, faUsers, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/class/project';
import { Property, PropertyKind, PropertyList } from 'src/app/models/class/property';
import { Task, UpdateResponsibles } from 'src/app/models/class/task';
import { Permission, PermissionsType, User } from 'src/app/models/class/user';
import { Value, ValueUpdate } from 'src/app/models/class/value';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

  @Input() task!: Task;
  @Input() project !: Project
  @Input() permissions !: Permission[];

  faUsers = faUsers
  faListCheck= faListCheck

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
  taskResponsables: any[] = []
  selectedUsers: any[] = []

  ngOnInit(): void {
    this.projectService.getProjectCollaborators(this.project.id).subscribe((users: User[]) => {
      this.taskResponsables = users
      
      for (const user of users) {
        this.taskService.getTaskResponsables(this.task.id).subscribe((users1: User[]) => {
          for(const user1 of users1){
            if(user.id === user1.id){
              this.selectedUsers.push(user)
            }
          }
        })
      }
    })

    for (const permission of this.permissions) {
      if (permission.name === PermissionsType.EDIT && permission.enabled) {
        this.canEdit = true;
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

  updateResponsible(user : any): void {
    console.log("entrei");
    
    const taskResponsibles: UpdateResponsibles = {
      taskId: this.task.id,
      teamId: this.project.idTeam,
      user: user
    }

    this.taskService.updateTaskResponsables(taskResponsibles).subscribe((task: Task) => {
       this.alertService.successAlert("editado")
    })
  }

  clickNode(node: any){
    console.log(node);
  }

}