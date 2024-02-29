import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendarDays, faCaretDown, faFont, faListNumeric, faPaperclip, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Property, PropertyKind, PropertyList } from 'src/app/models/property';
import { Task } from 'src/app/models/task';
import { Permission, PermissionsType } from 'src/app/models/user';
import { Value, ValueUpdate } from 'src/app/models/value';
import { AlertService } from 'src/app/services/alert.service';
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
  @Input() project !:Project
  canEdit: boolean = false;

  constructor(private taskService: TaskService, 
    private alertService : AlertService,
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

  ngOnInit(): void {
  }

  isSelected(option: any, value: any): boolean {
    return false;
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
}