import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/class/groups';
import { Project } from 'src/app/models/class/project';
import { PropertyKind, PropertyListKind } from 'src/app/models/class/property';
import { Task } from 'src/app/models/class/task';
import { Team } from 'src/app/models/class/team';
import { Permission, User } from 'src/app/models/class/user';
import { PipeParams } from 'src/app/models/interface/params';
import { AlertService } from 'src/app/services/alert.service';
import { GroupService } from 'src/app/services/group.service';
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
  isCreatingGroup: boolean = false;
  isCreating: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;
  clicked: string = 'project';
  logged !: User;
  team !: Team;
  tutorialText = tutorialText;

  //TASKS - FILTER AND ORDER
  selectedFilter !: string;
  filterOptions: any[] = [
    {name: 'Status', values: [
      {name: 'Não Iniciado', kind: PropertyListKind.TODO, status: true},
      {name: 'Em Andamento', kind: PropertyListKind.DOING, status: true},
      {name: 'Concluído', kind: PropertyListKind.DONE, status: true}
    ]},
    {name: 'Data', values: [
      {name: "Hoje", kind: PropertyKind.DATE as string, value: 'td' },
      { name: "Próxima semana", kind: PropertyKind.DATE as string, value: 'nw' },
      { name: "Próximo mês", kind: PropertyKind.DATE as string, value: 'nm'}
    ]},
  ];

  orderParams !: PipeParams;
  orderOptions : any = [
    { name: 'Nome', values: [
      { name: 'A-Z', type: 'name'  },
      { name: 'Z-A', type: 'name' }
    ]},
    { name: 'Data', values: [
      { name: 'Maior - Menor', type: 'date' },
      { name: 'Menor - Maior', type: 'date' }
    ] },
    { name: 'Status', values: [
      { name: 'Não Iniciado', type: 'status', kind: PropertyListKind.TODO },
      { name: 'Em Andamento', type: 'status', kind: PropertyListKind.DOING },
      { name: 'Concluído', type: 'status', kind: PropertyListKind.DONE },
    ] }
  ];


  queryFilter !: string;

  projectSearch !: string;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private userService: UserService,
    private teamService: TeamService,
    private groupService: GroupService,
    private router: Router,
  ) {
    this.logged = this.userService.getLogged();
  }
  
  
  permissionsOnTeam!: Permission[];
  permissionsOnTeamObservable!: Observable<Permission[]>;

  ngOnInit(): void {
    console.log('entrou');
    
    this.getTeam();
    this.validateTeamId();
  }

  validateTeamId(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService
      .existsByIdAndUserBelongs(teamId, this.logged.id!)
      .subscribe((exists: boolean) => {
        if (!exists) {
          this.router.navigate(['/home']);
          this.alert.errorAlert('Equipe inexistente!')
        }
      });
  }

  teamName: string = '';
  getTeam() {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService
    .getOneById(teamId)
    .subscribe((team: Team) => {
      this.team = team;
      this.teamName = team.name!;
      this.permissionsOnTeamObservable = this.teamService.getPermission(this.team, this.logged);
      this.permissionsOnTeamObservable.forEach((permissions: Permission[]) => {
        this.permissionsOnTeam = permissions;
      });

    });
  }



  delete(projectId: Project): void {
    this.projectService
      .delete(projectId.id)
      .subscribe((project: Project) => {
        this.alert.successAlert(`Projeto deletado com sucesso!`);
        this.team.projects?.splice(this.team.projects.indexOf(projectId),1)
      },
        e => {
          this.alert.errorAlert('Erro ao deletar projeto!');
        });
  }

  deleteGroup(groupId: Group): void {
    this.groupService.delete(groupId.id).subscribe((group: Group) => {
      this.alert.successAlert('Grupo deletado com sucesso')
      this.team.groups?.splice(this.team.groups.indexOf(groupId), 1)
    },
    e=> {
      this.alert.errorAlert("Não foi possível deletar");
    })
  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }

  switchCreateView(): void {
    this.isCreatingProject = !this.isCreatingProject;
    this.getTeam();
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
    this.orderParams = {name: '', type: ''};
    this.orderOpen = !this.orderOpen;
  }

  createGroup(group: Group): void {
    this.groupService
      .create(group)
      .subscribe((group: Group) => {
        this.alert.successAlert(`Grupo ${group.name} criado com sucesso!`);
        this.team.groups?.splice(this.team.groups.push(group))
        this.switchCreateViewGroup();
      },
        e => {
          if (group.name == null) {
            this.alert.errorAlert(`Você precisa adicionar um nome`)
          }else {
            this.alert.errorAlert(`Erro ao criar grupo`)            
          }
        });
  }

  switchCreateViewGroup(): void {
    this.isCreatingGroup = !this.isCreatingGroup;
  }


  taskOpen: boolean = false;
  taskOpenObject!: Task;
  changeModalTaskState(bool: boolean, task: Task): void {
    if(bool == false){
      this.taskOpenObject = {} as Task;
      this.taskOpen = false;
      return;
    } else {
      this.taskOpen = true;
      this.taskOpenObject = task;
    }
  }


  goTeamSettings():void{
    const route : string = 'equipe/' + this.team.id;
    this.router.navigate([route]);
  }
}