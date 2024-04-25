  import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
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
export class HeaderComponent implements OnInit {

  notifications : boolean = true;
  locations: LocationItem[] = locations;
  location: string = "";

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
            const id: number = params['id'];            
            this.incrementUrlById(activeRoute, id);
          }
        });
      }
    }); 

  }

  ngOnInit(): void {

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
    console.log(window.history.length);
    
    if (window.history.length > 2) this._location.back();
    else this.router.navigate(['/']);
  }

  incrementUrlById(activeRoute: string, id: number): void {     
    if (activeRoute.includes('projetos')) this.getTeam(id);
    if (activeRoute.includes('tarefas')) this.getProject(id);
    if (activeRoute.includes('usuario/perfil')) this.getUser(id);
  }

  getTeam(id: number): void {
    this.teamService
      .getOneById(id)
      .subscribe((team: Team) => {
        this.location = team.name;      
      })
  }

  getProject(id: number): void {
    console.log(this.userService.getLogged().id!);
    
    this.projectService
      .getOneById(id, this.userService.getLogged().id!)
      .subscribe((project: Project) => {
        this.location = project.name;
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
