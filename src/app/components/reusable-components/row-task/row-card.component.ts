import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import {
  faTrashCan, 
  faEnvelope, 
  faClockRotateLeft, 
  faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
import { Value } from 'src/app/models/value';
import { PropertyKind } from 'src/app/models/property';
import { TeamService } from 'src/app/services/team.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { UserService } from 'src/app/services/user.service';
import { Permission, PermissionsType } from 'src/app/models/user';


@Component({
  selector: 'app-row-card',
  templateUrl: './row-card.component.html',
  styleUrls: ['./row-card.component.scss']
})
export class RowCardComponent {
  faEllipsisVertical = faEllipsisVertical;
  faClock = faClockRotateLeft;
  faEnvelope = faEnvelope;
  faTrashCan = faTrashCan;

  project !: Project;

  constructor(private teamService: TeamService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private userService: UserService) { 
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.projectService
      .getOneById(id)
      .subscribe((p: Project) => {
        this.project = p;

        this.teamService.hasPermission(id, this.userService.getLogged()).subscribe((permissions: Permission[]) => {
          this.userService.getLogged().permissions = permissions;
    
          for (let i = 0; i < permissions.length; i++) {
            if ((permissions[i].name === PermissionsType.DELETE) && permissions[i].enabled === true) {
              this.canDelete = true;
              this.icons[0].disabled = false;
            }
          }
        });
      })
  }


  @Input()
  task!: Task;

  @Input()
  cols!: any[];

  value!: Value;

  canDelete : boolean = false;

  icons: any[] = [
    // { id: 'clock', icon: this.faClock },
    // { id: 'chat', icon: this.faEnvelope },
    { id: 'delete', icon: this.faTrashCan, disabled: true }
  ];

  ngOnInit(): void { 
     
  }

  getCols(): any[] {
    let cols : any [] = [];
    this.cols.map((col) => { 
      if(col.field !== "name") {
        cols.push(col);
      }
    });
    return cols;
  }

  getNameWidth(): string {
    return "300px";
  }

  getPropertyValue(col: any) : Value {
    let value : Value;
    this.task.values?.forEach(values => {
      if (col.field === values.property.kind) {
        value = values;
      }
    });
    return value!;
  }

}
