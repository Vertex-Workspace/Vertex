import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { Team } from 'src/app/models/class/team';
import { AlertService } from 'src/app/services/alert.service';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/models/class/user';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/class/task';
import { PropertyKind, PropertyListKind } from 'src/app/models/class/property';
import { PipeParams } from 'src/app/models/interface/params';
import { JoyrideService } from 'ngx-joyride';
import { tutorialText } from 'src/app/tutorialText';
import { ProjectService } from 'src/app/services/project.service';
import { TranslateService } from '@ngx-translate/core'; // Import TranslateService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  logged !: User;
  tutorialText = tutorialText;

  teams !: Team[];
  teamsRender!: Observable<Team[]>;

  teamSearch !: string;

  isCreating: boolean = false;

  orderParams !: PipeParams;
  
  //TASKS - FILTER AND ORDER
  selectedFilter !: any;
  filterDate !: string;
  
  filterOptions: any[] = [];
  orderOptions: any =[];

  orderSettings: any[] =[];
  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
  ];

  filterOpen !: boolean;
  orderOpen !: boolean;

  queryFilter !: string;

  faPlus = faPlusSquare;

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private alert: AlertService,
    private projectService: ProjectService,
    private readonly joyrideService: JoyrideService,
    private translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.logged = this.userService.getLogged();

    this.translate.onLangChange.subscribe(() => {
      this.loadTranslatedOptions();
    });
  }

  ngOnInit(): void {
    this.subscribeToTeams();
    this.loadTranslatedOptions();
  }

  
  loadTranslatedOptions() {
    // Translate filter and order options
    this.filterOptions = [
      {
        name: this.translate.instant('pages.home.filterandorder.Status'), values: [
          { name: this.translate.instant('pages.home.filterandorder.NotStarted'), kind: PropertyListKind.TODO, status: true },
          { name: this.translate.instant('pages.home.filterandorder.InProgress'), kind: PropertyListKind.DOING, status: true },
          { name: this.translate.instant('pages.home.filterandorder.Completed'), kind: PropertyListKind.DONE, status: true }
        ]
      },
      {
        name: this.translate.instant('pages.home.filterandorder.Date'), values: [
          { name: this.translate.instant('pages.home.filterandorder.Today'), kind: PropertyKind.DATE as string, value: 'td' },
          { name: this.translate.instant('pages.home.filterandorder.NextWeek'), kind: PropertyKind.DATE as string, value: 'nw' },
          { name: this.translate.instant('pages.home.filterandorder.NextMonth'), kind: PropertyKind.DATE as string, value: 'nm' }
        ]
      },
    ];

    this.orderOptions = [
      {
        name: this.translate.instant('pages.home.filterandorder.Name'), values: [
          { name: this.translate.instant('pages.home.filterandorder.AtoZ'), type: 'name' },
          { name: this.translate.instant('pages.home.filterandorder.ZtoA'), type: 'name' }
        ]
      },
      {
        name: this.translate.instant('pages.home.filterandorder.Date'), values: [
          { name: this.translate.instant('pages.home.filterandorder.HigherToLower'), type: 'date' },
          { name: this.translate.instant('pages.home.filterandorder.LowerToHigher'), type: 'date' }
        ]
      },
      {
        name: this.translate.instant('pages.home.filterandorder.Status'), values: [
          { name: this.translate.instant('pages.home.filterandorder.NotStarted'), type: 'status', kind: PropertyListKind.TODO },
          { name: this.translate.instant('pages.home.filterandorder.InProgress'), type: 'status', kind: PropertyListKind.DOING },
          { name: this.translate.instant('pages.home.filterandorder.Completed'), type: 'status', kind: PropertyListKind.DONE },
        ]
      }
    ];

    // Detect changes after loading translations
    this.detectChanges();
  }

  detectChanges() {
    this.changeDetectorRef.detectChanges();
  }

  updateOrderType(e: PipeParams): void {
    if (e.type) {
      this.orderParams.type = e.type;
    }

    if (e.kind) {
      this.orderParams.kind = e.kind;
    }
  }


  subscribeToTeams() {
    this.teamService.getTeamsByUser(this.logged).subscribe(teams => {
      this.teams = teams
      this.joyrideService.startTour({
        steps: [
          'step1@home',
          `sidebar@home`,
          `header@home`,
          'step2@home',
          `step3@home`,
          `goToTeamPage@home`,
          `step4@equipe/${this.teams[0].id}/projetos`,
          `step5@equipe/${this.teams[0].id}/projetos`,
          `goToTasks@equipe/${this.teams[0].id}/projetos`,
          `step6@projeto/${this.teams[0].projects[0].id}/tarefas`,
        ],
      });
    });
  }

  switchCreateView(): void {
    this.isCreating = !this.isCreating;
  }

  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
    this.selectedFilter = '';
    this.filterDate = '';
  }

  clickOrder(): void {
    this.orderParams = { name: '', type: '' };
    this.orderOpen = !this.orderOpen;
  }


  taskOpen: boolean = false;
  taskOpenObject!: Task;
  changeModalTaskState(bool: boolean, task: Task): void {
    if (bool == false) {
      this.taskOpenObject = {} as Task;
      this.taskOpen = false;
      return;
    } else {
      this.taskOpen = true;
      this.taskOpenObject = task;
    }
  }

  updateTeams(team: Team) {
    this.teams.push(team);
    this.switchCreateView();
  }


}
