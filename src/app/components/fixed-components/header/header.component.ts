import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Project } from 'src/app/models/class/project';
import { Team } from 'src/app/models/class/team';
import { User } from 'src/app/models/class/user';
import { NotificationWebSocketService } from 'src/app/services/notification-websocket.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { locations, LocationItem } from 'src/assets/data/locations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  notifications : boolean = true;
  locations: LocationItem[] = locations;
  location: string = "";
  id !: number;

  @Input()
  notificationBadge!: number;

  @Input()
  currentRoute !: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private projectService: ProjectService,
    private userService: UserService,
    private _location: Location,
    private notificationWebSocket: NotificationWebSocketService
  ) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        const activeRoute: string = val.url as string;  

        let r = this.route;
        while (r.firstChild) {
          r = r.firstChild;
        }
        this.updateLocation(activeRoute);

        r.params.subscribe(params => {
          if (params) {
            this.id = params['id'];           
            this.incrementUrlById(activeRoute, this.id);
          }
        });
      }
    }); 
  }

  @Output()
  openNotification = new EventEmitter();

  openNotifications():void{
    this.openNotification.emit();
  }

  updateLocation(activeRoute: string): void {
    this.locations
      .find((loc: LocationItem) => {
        if (activeRoute.includes(loc.url)) {      
          this.location = loc.name;       
        }
      })          
  }

  back(): void {
    this.backLocationHandler(this.router.url);
  }

  backLocationHandler(currentLocation: string): void {
    const previousLocation: Record<string, () => void> = {
      '/projeto/' : () => this.backToTeam(true),
      '/projetos' : () => this.backToHome(),
      '/perfil/' : () => this.backToHome(),
      '/equipe/' : () => this.backToTeam(false),
      '/chat/' : () => this.backToHome(),
      '/configuracoes/' : () => this.backToHome()
    }

    for (const location in previousLocation) {
      if (currentLocation.includes(location)) {
        previousLocation[location]();
        return;
      }
    }
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }

  backToTeam(hasProjectId: boolean): void {
    if (hasProjectId) {
      this.projectService
      .getOneById(this.id)
      .subscribe(project => {
        this.router.navigate([`equipe/${project.idTeam}/projetos`])
      });
    } 
  }

  incrementUrlById(activeRoute: string, id: number): void {     
    if (activeRoute.includes('projetos')) this.getTeam(id);
    if (activeRoute.includes('tarefas')) this.getProject(id);
    if (activeRoute.includes('usuario/perfil')) this.getUser(id);
  }

  getTeam(id: number): void {
    this.teamService
      .getTeamName(id)
      .subscribe((team: any) => {
        this.location = team.text;      
      }, (error) => this.location = error.error.text);
  }

  getProject(id: number): void {
    this.projectService
      .getProjectName(id)
      .subscribe((projectName: string) => {
        this.location = projectName;
      })
  }

  getUser(id: number): void {
    this.userService
      .getOneById(id)
      .subscribe((user: User) => {
        this.location += " " + user.firstName!;
      })
  }

}
