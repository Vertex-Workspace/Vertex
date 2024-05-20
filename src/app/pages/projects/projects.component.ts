import { CardListComponent } from 'src/app/components/reusable-components/card-list/card-list.component';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core'; // Import TranslateService
import { Group } from 'src/app/models/class/groups';
import { CreationOrigin, Project, ProjectReview } from 'src/app/models/class/project';
import { PropertyKind, PropertyListKind } from 'src/app/models/class/property';
import { Task } from 'src/app/models/class/task';
import { Team } from 'src/app/models/class/team';
import { Permission, User } from 'src/app/models/class/user';
import { PipeParams } from 'src/app/models/interface/params';
import { AlertService } from 'src/app/services/alert.service';
import { GroupService } from 'src/app/services/group.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { tutorialText } from 'src/app/tutorialText';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  isCreatingProject: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;
  clicked: string = 'project';
  logged !: User;
  team !: Team;
  tutorialText = tutorialText;

  //TASKS - FILTER AND ORDER
  selectedFilter !: string;
  filterOptions: any[] = [];

  orderParams !: PipeParams;
  orderOptions: any = [];
  isCreator !: boolean;


  queryFilter !: string;

  projectSearch !: string;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private userService: UserService,
    private teamService: TeamService,
    private router: Router,
    private translate: TranslateService,
    private cd: ChangeDetectorRef
  ) {
    this.logged = this.userService.getLogged();
  }


  permissionsOnTeam!: Permission[];

  ngOnInit(): void {    
    this.getTeam();
    this.updateTranslate();
  }

  teamName: string = '';
  getTeam() {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService
    .getScreenInformationsById(teamId)
    .subscribe((team: Team) => {      
      this.team = team;
      this.isCreator = this.logged.id! === team.creator.id!;
      this.teamName = team.name!;
      this.projects = this.team.projects;
      this.permissionsOnTeam = team.permissions;   
    });
  }

  updateTranslate() {
    this.filterOptions = [
      {
        name: this.translate.instant('pages.projects.filterAndOrder.Status'), values: [
          { name: this.translate.instant('pages.projects.filterAndOrder.NotStarted'), kind: PropertyListKind.TODO, status: true },
          { name: this.translate.instant('pages.projects.filterAndOrder.InProgress'), kind: PropertyListKind.DOING, status: true },
          { name: this.translate.instant('pages.projects.filterAndOrder.Completed'), kind: PropertyListKind.DONE, status: true }
        ]
      },
      {
        name: this.translate.instant('pages.projects.filterAndOrder.Date'), values: [
          { name: this.translate.instant('pages.projects.filterAndOrder.Today'), kind: PropertyKind.DATE as string, value: 'td' },
          { name: this.translate.instant('pages.projects.filterAndOrder.NextWeek'), kind: PropertyKind.DATE as string, value: 'nw' },
          { name: this.translate.instant('pages.projects.filterAndOrder.NextMonth'), kind: PropertyKind.DATE as string, value: 'nm' }
        ]
      },
    ];

    this.orderOptions = [
      {
        name: this.translate.instant('pages.projects.filterAndOrder.Name'), values: [
          { name: this.translate.instant('pages.projects.filterAndOrder.AtoZ'), type: 'name' },
          { name: this.translate.instant('pages.projects.filterAndOrder.ZtoA'), type: 'name' }
        ]
      },
      {
        name: this.translate.instant('pages.projects.filterAndOrder.Date'), values: [
          { name: this.translate.instant('pages.projects.filterAndOrder.HigherToLower'), type: 'date' },
          { name: this.translate.instant('pages.projects.filterAndOrder.LowerToHigher'), type: 'date' }
        ]
      },
      {
        name: this.translate.instant('pages.projects.filterAndOrder.Status'), values: [
          { name: this.translate.instant('pages.projects.filterAndOrder.NotStarted'), type: 'status', kind: PropertyListKind.TODO },
          { name: this.translate.instant('pages.projects.filterAndOrder.InProgress'), type: 'status', kind: PropertyListKind.DOING },
          { name: this.translate.instant('pages.projects.filterAndOrder.Completed'), type: 'status', kind: PropertyListKind.DONE },
        ]
      }
    ];
    this.detectChanges();
  }

  detectChanges() {
    this.cd.detectChanges();
  }

  delete(project: Project): void {
    this.projectService
      .delete(project.id)
      .subscribe(
        () => {
          this.alert.successAlert(this.translate.instant('alerts.success.project_deleted'));
          this.team.projects?.splice(this.team.projects.indexOf(project), 1);
          window.location.reload();
        },
        e => {
          this.alert.errorAlert(this.translate.instant('alerts.error.delete_project'));
        }
      );
  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }

  projects: Project[] = []

  switchCreateView(): void {
    this.isCreatingProject = !this.isCreatingProject;
  }

  updateProjects(project: Project) {
    this.projects.push(project);
    this.switchCreateView();
  }

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
  ];

  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
    this.selectedFilter = '';
  }

  clickOrder(): void {
    this.orderParams = { name: '', type: '' };
    this.orderOpen = !this.orderOpen;
  }

  taskOpen: boolean = false;
  taskOpenObject!: Task;
  changeModalTaskState(bool: boolean, task: Task): void {
    console.log(task);
    
    if (bool == false) {
      this.taskOpenObject = {} as Task;
      this.taskOpen = false;
      return;
    } else {
      this.taskOpenObject = task;
      console.log(this.taskOpenObject);
      
      this.taskOpen = true;
    }
  }


  goTeamSettings(): void {
    const route: string = 'equipe/' + this.team.id;
    this.router.navigate([route]);
  }

  createCalendarProject() {
    const project: any = {
      name: `Agenda de ${this.logged.firstName}`,
      description: 'Aqui você pode interagir com todos os seus eventos do Google Agenda em formato de tarefas',
      projectReviewENUM: ProjectReview.EMPTY,
      creator: {
        user: {
          id: this.logged.id!
        },
        team: {
          id: this.team.id!
        }
      }
    }

    this.projectService
      .createFromCalendar(project, this.team.id!, this.logged.id!)
      .subscribe(project => this.projects.push(project));

  }

  calendarAlreadyImported(): boolean {
    return this.team.projects.some(p => {      
      return p.creationOrigin == 'GOOGLE';
    });
  }


}
