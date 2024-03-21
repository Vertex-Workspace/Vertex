import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/class/team';
import { Project } from 'src/app/models/class/project';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { faTrashCan, faGear } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/class/user';

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
    private route: ActivatedRoute 
  ) { }

  faTrashCan = faTrashCan;
  faGear = faGear

  @Input()
  filterSearch !: string;
  
  @Input()
  teams?: Team[]; //se estiver na home

  @Input()
  team?: Team; //se estiver na tela projetos

  projects : Project [] = []

  @Input()
  type !: string;

  @Input()
  teamScreen !: string;

  @Output()
  emitterItem = new EventEmitter();

  itemToDelete: any

  delete: boolean = false;

  
 firstLetterName?: string

 creatorName ?: String

 loggedUser ?: User


  ngOnInit(): void {
    this.findAllTeams() 
    const teamId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.findProjects(teamId); 
  }

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
      this.router.navigate([`/projeto/${id}/tarefas`])
    }
  }

  openModalDelete(item: any) {
    this.delete = !this.delete
    this.itemToDelete = item
  }


  emitItem(event: boolean) {
    if (event) {
      this.emitterItem.emit(this.itemToDelete)
    }
    this.delete = false;
  }

  findAllTeams() {
    this.teamService.getTeamsByUser(this.userService.getLogged()).subscribe((teams: Team[]) => {
      for (let i = 0; i < teams.length; i++) {
        this.teamService.getTeamCreator(teams[i]).subscribe((userC) => {
          
          if (teams[i].name === "Equipe " + userC.firstName) {
            this.creatorName = userC.firstName
            this.firstLetterName = userC.firstName?.substring(0, 1).toLocaleUpperCase()       
          }
        })
      }
    })
  }

  findProjects(teamId: number) {
    this.loggedUser = this.userService.getLogged();
    // this.teamService.getOneById(this.team.)
    console.log(teamId, this.loggedUser);
    
    this.projectService.getProjectByCollaborators(teamId, this.loggedUser).subscribe((projects: Project []) => {
      this.projects = projects
    })
    
  }

  getFirstLetter(item : any): string{
    return item.name.substring(0, 1).toLocaleUpperCase();
  }

  openModal: boolean = false;
  project !: Project

  openInformations(project: Project){
    this.openModal = !this.openModal;
    this.projectService.getOneById(project.id).subscribe((project: Project) => {
      this.project = project  
    }) 
    this.teamService.getOneById(this.project.idTeam).subscribe((team: Team) => {
      this.team = team;
    })
  }

}