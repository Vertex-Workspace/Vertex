import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/groups';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
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
  group !: Group;

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
    
  }

  ngOnInit(): void {
    this.getTeam();
    this.validateProjectId();
    this.getRecentProjects();
  }

  getRecentProjects(): void {
    this.recentProjects = this.team.projects!;
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
    console.log(groupId); 
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
    console.log(this.isCreatingProject);

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

  createProject(project: Project): void {

    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    project.creator = this.logged;

    this.projectService
      .create(project, teamId)
      .subscribe((project: Project) => {
        this.alert.successAlert(`Projeto ${project.name} criado com sucesso!`);
        this.team.projects?.splice(this.team.projects.push(project))
      });

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
            this.alert.errorAlert(`Você precisa adicionar um nome`)
          }

        });
  }

  switchCreateViewGroup(): void {
    this.isCreatingGroup = !this.isCreatingGroup;
  }
}
