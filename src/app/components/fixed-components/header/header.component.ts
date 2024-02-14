import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
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
  currentRoute !: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private projectService: ProjectService,
    private userService: UserService,
    private _location: Location
  ) {
    router.events
      .subscribe((val: any) => {
        if (val instanceof NavigationEnd) {
          this.updateLocation(val);
        }
      })    
  }

  ngOnInit(): void {
  }

  @Output()
  openNotification = new EventEmitter();

  openNotifications():void{
    this.openNotification.emit();
  }

  updateLocation(val: any): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    const activeRoute: string = val.url as string;        

    this.locations
      .find((loc: LocationItem) => {
        if (activeRoute.includes(loc.url)) {
          this.location = loc.name;              
          if (id) {
            this.location += this.verifyUrlId(activeRoute, id)
          }
        }
      })          

  }

  back(): void {
    this._location.back();
  }

  verifyUrlId(activeRoute: string, id: number): string {    
    if (activeRoute.includes('projetos')) return ` ${this.getTeam(id)}`;
    if (activeRoute.includes('tarefas')) return ` ${this.getProject(id)}`;
    if (activeRoute.includes('usuario/perfil')) return ` ${this.getUser(id)}`;
    return "a";
  }

  getTeam(id: number): string {
    let name: string = "";

    this.teamService
      .getOneById(id)
      .subscribe((team: Team) => {
        name = team.name;
      })

      return name;
  }

  getProject(id: number): string {
    let name: string = "";

    this.projectService
      .getOneById(id)
      .subscribe((project: Project) => {
        name = project.name;
      })
      
      return name;
  }

  getUser(id: number): string {
    let name: string = "";

    this.userService
      .getOneById(id)
      .subscribe((user: User) => {
        name = user.firstName!;
      })

    return name;
  }

}
