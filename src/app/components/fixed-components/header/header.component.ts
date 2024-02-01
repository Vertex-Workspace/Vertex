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
      console.log(_location.normalize(_location.path()));
      
      
  }

  ngOnInit(): void {
  }

  @Output()
  openNotification = new EventEmitter();

  openNotifications():void{
    this.openNotification.emit();
  }

  updateLocation(val: any): void {
    const activeRoute: string = val.url as string;        

    this.locations
      .find((loc: LocationItem) => {
        if (activeRoute.includes(loc.url)) {
          this.location = loc.name;          
        }
      })
  }

  back(): void {
    this._location.back();
  }

  verifyUrlId(activeRoute: string, name: string): string {
    if (activeRoute.includes('projetos')) return ` ${this.getTeam()}`;
    if (activeRoute.includes('tarefas')) return ` ${this.getProject()}`;
    if (activeRoute.includes('usuario/perfil')) return ` ${this.getUser()}`;
    return name;
  }

  getTeam(): string {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.teamService
      .getOneById(id)
      .subscribe((team: Team) => {
        return team.name;
      })

      return "t";
  }

  getProject(): string {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.projectService
      .getOneById(id)
      .subscribe((project: Project) => {
        return project.name;
      })
      
      return "p";
  }

  getUser(): string {
    const id: number = Number(this.route.snapshot.paramMap.get('id'))

    this.userService
      .getOneById(id)
      .subscribe((user: User) => {
        return user.firstName;
      })

    return "u";
  }

}
