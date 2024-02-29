import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '@syncfusion/ej2-angular-grids';
import { Project } from 'src/app/models/class/project';
import { Team } from 'src/app/models/class/team';
import { User } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { GroupService } from 'src/app/services/group.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

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
  clicked: string = 'task';
  recentProjects !: Project[];
  logged !: User;
  team !: Team;
  emptyTeamProjects !: boolean;

  //TASKS - FILTER AND ORDER
  filterSettings: any[] = [];
  orderSettings: any[] = [];

  menuItems = [
    { id: 'task', iconClass: 'pi pi-list', label: 'Tarefas' },
    { id: 'project', iconClass: 'pi pi-folder-open', label: 'Projetos', button: 'Novo Projeto' },
    { id: 'group', iconClass: 'pi pi-users', label: 'Grupos', button: 'Novo grupo' },
  ];

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
    this.getTeam();
  }

  ngOnInit(): void {
    this.validateProjectId();
    this.emptyTeamProjects = true;
  }

  getRecentProjects(team: Team): void {
    if (Array.isArray(team.projects)) {
      this.recentProjects = team.projects!;
    }
  }


  validateProjectId(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService
      .existsByIdAndUserBelongs(teamId, this.logged.id!)
      .subscribe((exists: boolean) => {
        if (!exists) {
          this.router.navigate(['/home']);
          this.alert.errorAlert('Equipe inexistente!')
        }
      },
        e => {

        })

  }

  getTeam(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService
      .getOneById(teamId)
      .subscribe((team: Team) => {
        this.team = team;
        this.getRecentProjects(team);
        if (team.projects) this.emptyTeamProjects = false;
      })      
    }


  delete(projectId: Project): void {
    this.projectService
      .delete(projectId.id)
      .subscribe((project: Project) => {
        this.alert.successAlert(`Projeto deletado com sucesso!`);
        this.team.projects?.splice(this.team.projects.indexOf(projectId),1)
        this.getAfterChange();
        this.team.projects?.splice(this.team.projects.indexOf(project), 1);
      },
        e => {
          this.alert.errorAlert('Erro ao deletar projeto!');
        });
  }

  deleteGroup(groupId: Group):void {
    // console.log(groupId); 
    // this.groupService.delete(groupId.id).subscribe((group: Group) => {
    //   this.alert.successAlert('Grupo deletado com sucesso')
    //   this.team.groups?.splice(this.team.groups.indexOf(groupId), 1)
    // },
    // e=> {
    //   this.alert.errorAlert("Não foi possível deletar");
    // })
  }

  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }

  switchCreateView(): void {
    this.isCreatingProject = !this.isCreatingProject;
    this.getAfterChange()
    this.getAfterChange();
    // this.getAfterChange();
  }

  getAfterChange(): void {
    if (!this.isCreatingProject) {
      this.projectService
        .getAllByTeam(this.team.id!)
        .subscribe((projects) => {
          this.team.projects = projects;
        });
    } else {
      this.team.projects = [];
    }
    this.isCreating = !this.isCreating;
    this.updateList();
  }

  updateList(): void {
    this.getTeam();
  }

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
  ];

  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
  }

  clickOrder(): void {
    this.orderOpen = !this.orderOpen;
  }

  createGroup(group: Group): void {
    // this.groupService
    //   .create(group)
    //   .subscribe((group: Group) => {
    //     this.alert.successAlert(`Grupo ${group.name} criado com sucesso!`);
    //     this.team.groups?.splice(this.team.groups.push(group))
    //     this.switchCreateViewGroup();
    //   },
    //     e => {
    //       if (group.name == null) {
    //         this.alert.errorAlert(`Você precisa adicionar um nome`)
    //       }else {
    //         this.alert.errorAlert(`Erro ao criar equipe`)
    //         console.log(group);
            
    //       }

        // });
  }

  switchCreateViewGroup(): void {
    this.isCreatingGroup = !this.isCreatingGroup;
  }
}
