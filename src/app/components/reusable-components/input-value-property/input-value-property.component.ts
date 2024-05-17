import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Property, PropertyKind, PropertyList, PropertyListKind } from 'src/app/models/class/property';
import { Task } from 'src/app/models/class/task';
import { Value, ValueUpdate } from 'src/app/models/class/value';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/class/project';
import { Permission, PermissionsType } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

//teste pra ver se foi
@Component({
  selector: 'app-input-value-property',
  templateUrl: './input-value-property.component.html',
  styleUrls: ['./input-value-property.component.scss']
})
export class InputValuePropertyComponent {

  @Output()
  changes = new EventEmitter();

  @Input() backgroundColor?: string = '';

  @Input()
  value!: Value;

  @Input()
  task!: Task;

  project !: Project;

  @Input() canEdit !: boolean;


  constructor(private teamService: TeamService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
    private taskService: TaskService,
    private router: Router,
    private primeNGCOnfig : PrimeNGConfig,
    private translate : TranslateService) { }


  oldValue!: Value;

  ngOnChanges(){
    if(this.value.property.kind === PropertyKind.STATUS){
      const value : PropertyList = this.value.value as PropertyList;
      if(value.propertyListKind !== PropertyListKind.DONE){
        this.oldValue = new Value(this.value);
      }
    }
  }
  calendarClicked: boolean = false;
  portugueseDate: any;

  ngOnInit(): void {
    this.oldValue = new Value(this.value);

    if (this.value.property.kind === PropertyKind.STATUS ||
      this.value.property.kind === PropertyKind.LIST) {
      this.setBackground();
    }
    if (this.value.property.kind === PropertyKind.NUMBER && this.value.value != null) {
      this.valueNumber = this.value.value as number;
    }
    if (this.value.property.kind === PropertyKind.TEXT && this.value.value != null) {
      this.valueText = this.value.value as string;
    }

    this.portugueseDate = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      dayNamesMin: ["Do","Se","Te","Qu","Qu","Se","Sa"],
      monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
      monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sem'
    };
    this.primeNGCOnfig.setTranslation(this.portugueseDate);

    if (this.value.property.kind === PropertyKind.DATE) {
      this.date = new Date(this.value.value as string);
    }
  }
  date!: Date;
  valueNumber: number = 0;
  valueText: string = "Vazio";

 
  getValue(): string | number {
    if (this.value.property.kind === PropertyKind.STATUS || this.value.property.kind === PropertyKind.LIST) {
      let valueProperty = this.value.value as PropertyList;
      if (valueProperty == null) {
        return "";
      }

      return valueProperty.value;
    }
    if (this.value.value == null) {
      if (this.value.property.kind === PropertyKind.NUMBER) {
        return 0;
      }
      return "Vazio";
    }
    if (this.value.property.kind === PropertyKind.DATE) {
      let date = new Date(this.value.value as string);
      //to format the date to yyyy-mm-dd
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    return this.value.value as string;
  }


  getSelectOptions(value: Value): PropertyList[] {
    return value.property.propertyLists;
  }

  getKind(property: Property, kind: string): boolean {
    return property.kind === kind;
  }

  isSelected(propertyList: PropertyList, value: Value): boolean {
    let valueProperty = value.value as PropertyList;
    return propertyList.id === valueProperty.id;

  }

  changeDate(event: any): void {
    if (this.canEdit) {
      this.value.value = new Date(event).toISOString().slice(0, -1);
      this.updateTask(this.value);
    } else {
      this.alertNotPermission();
    }
  }

  changeList(event: any, value: Value): void {
    if (this.canEdit) {
      this.updateTask(value);
    } else {
      this.alertNotPermission();
    }
  }

  private alertNotPermission(): void {
    console.log("NOT PERMISSION");
    if (this.router.url.includes("home")) {
      console.log("home");
      this.alertService.errorAlert(this.translate.instant("alerts.error.notPermissionEditTask"))
    } else {
      this.alertService.errorAlert(this.translate.instant("alerts.error.cantEdit"));
    }

  }

  change(value: Value): void {
    if (this.canEdit) {
      if (value.property.kind === PropertyKind.NUMBER) {
        value.value = this.valueNumber;
      }
      if (value.property.kind === PropertyKind.TEXT) {
        value.value = this.valueText;
      }
      this.updateTask(value);
    }
    else {
      this.alertNotPermission();
    }
  }

  updateTask(value: Value): void {
    let valueTest: string | number | Date | PropertyList;
    if (value.property.kind === PropertyKind.DATE) {
      valueTest = value.value as Date;
    } else if (value.property.kind === PropertyKind.NUMBER) {
      valueTest = Number(value.value);
    } else if (value.property.kind === PropertyKind.STATUS || value.property.kind === PropertyKind.LIST) {
      let propertyList: PropertyList = value.value as PropertyList;
      valueTest = propertyList.id;
      if(propertyList.propertyListKind === PropertyListKind.DONE){
        this.taskService.setTaskDependencyNull(this.task.id, this.task).subscribe((task: Task)=> {
          this.task = task;
        })
      }
    } else {
      valueTest = value.value;
    }

    
    const valueUpdate: ValueUpdate = {
      id: this.task.id,
      value: {
        property: {
          id: value.property.id
        },
        value: {
          id: value.id,
          value: valueTest
        }
      },
      userID: this.userService.getLogged().id!
    };

    this.taskService.patchValue(valueUpdate).subscribe(
      (task) => {
        this.task = task;
        
        this.alertService.successAlert(value.property.name + this.translate.instant("alerts.success.alterated"));
        this.changes.emit(task);
      },
      (error) => {
        if (this.value.property.kind === PropertyKind.STATUS) {
          this.value = this.oldValue;

          this.task.values[0] = this.value;
          this.setBackground();
        }
        this.alertService.errorAlert(error.error);
      }
    );
  }

  setBackground(): void {
    let valuePropertyList: PropertyList = this.value.value as PropertyList;
    if (valuePropertyList != null) {
      this.backgroundColor = valuePropertyList.color;
    }
  }
}
