import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/class/team';
import { Project } from 'src/app/models/class/project';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { faTrashCan, faGear, faMessage } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/class/user';
// import { StringFilterUI } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  constructor(
    private router: Router,
    private teamService: TeamService,
    private userService: UserService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  faTrashCan = faTrashCan;
  faGear = faGear
  faMessage = faMessage
  
  @Input()
  filterSearch !: string;

 
  @Input()
  teams?: Team[]; //se estiver na home

  @Input()
  team?: Team; //se estiver na tela projetos

  @Input()
  projects: Project[] = []

  @Input()
  type !: string;

  @Input()
  teamScreen !: string;

  @Output()
  emitterItem = new EventEmitter();

  itemToDelete: any

  delete: boolean = false;


  firstLetterName?: string

  creatorName?: String

  loggedUser?: User

  image!: string

  dependencyName !: string

  ngOnChanges(){
    this.renderList = this.getType();
  }

  ngOnInit(): void {
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    if(teamId){
      this.findProjects(teamId); 
      this.renderList = this.getType();

    }else { 
      this.renderList = this.getType();
    }
  }
  renderList : any[] = [];

  getType(): any[] {
    if (this.type === 'project') {
      return this.projects
    }

    return this.teams!;
  }

  openTeam(id: number) {
    if (this.type === 'team') {
      this.router.navigate([`/equipe/${id}/projetos`]);
    } else {
      this.projectService.getOneById(id).subscribe((project: Project) => {
        
        // if (project.projectDependency === null) {
        this.router.navigate([`/projeto/${id}/tarefas`])
        // } else {
        //   this.projectService.getTasksDone(project.projectDependency.id, project.id).subscribe((bool: String) => { 
        //     if (bool == 'true') {
        //       this.router.navigate([`/projeto/${id}/tarefas`])
        //     } else if(bool = 'false') {
        //       this.dependencyName = project.projectDependency.name;
        //       this.alertService.notificationAlert("Você precisa concluir o projeto " + this.dependencyName
        //         + " primeiro!")
        //     }
        //   })
        // }
      })
    }
  }

  openModalDelete(item: any) {
    this.delete = !this.delete
    this.itemToDelete = item
  }

  close() {
    this.openModal = !this.openModal;
    this.project = null!
  }

  getImage(item : any) {
    let file : any;
    if(this.type === 'team') {
      file = item.image
    } else {
      file = item.file.file
    }
    console.log(file);
    if(file == null){
      return "";
    }
    
    return file;
  }


  emitItem(event: boolean) {
    if (this.teams) {
      this.deleteTeam(this.itemToDelete)
    }
    if (this.projects) {
      this.deleteProject(this.itemToDelete)
    }
    // if (event) {
    //   this.emitterItem.emit(this.itemToDelete)
    // }
    this.delete = false;
  }

  findProjects(teamId: number) {
    this.loggedUser = this.userService.getLogged();
    // this.teamService.getOneById(this.team.)
    
    this.projectService.getProjectByCollaborators(teamId, this.loggedUser!).subscribe((projects: Project []) => {
      this.projects = projects
    })
    
  }

  getFirstLetter(item: any): string {
    return item.name.substring(0, 1).toLocaleUpperCase();
  }

  openModal: boolean = false;
  project !: Project

  openInformations(project1: Project) {
    this.openModal = !this.openModal;
    this.project = project1;
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.project.idTeam = teamId  
  }

  deleteProject(projectId: Project): void {
    this.projectService
      .delete(projectId.id)
      .subscribe((project) => {
        this.projects.splice(this.projects.indexOf(projectId), 1)
      });
  }

  deleteTeam(teamId: Team): void {
    this.teamService
      .delete(teamId.id)
      .subscribe((team) => {
        this.teams?.splice(this.teams.indexOf(teamId), 1)
      });
  }
  openTeamInformations(teamId : number) {
    this.router.navigate([`/equipe/${teamId}`])
  }

}