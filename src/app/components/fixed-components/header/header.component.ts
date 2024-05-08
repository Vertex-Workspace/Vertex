import { Location } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';
import { Personalization } from 'src/app/models/class/personalization';
import { PersonalizationService } from 'src/app/services/personalization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  notifications: boolean = true;
  locations: LocationItem[] = locations;
  location: string = "";
  id !: number;

  translates: any[] = [
    { sigla: 'pt', image: 'https://www.gov.br/mre/pt-br/embaixada-seul/arquivos/imagens/BRASIL.png'},
    { sigla: 'es', image: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/bandeira-espanha-55c26319db07f.jpg'},
    { sigla: 'en', image: 'https://s3.static.brasilescola.uol.com.br/be/conteudo/images/estados-unidos.jpg'},
    { sigla: 'zh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/2560px-Flag_of_the_People%27s_Republic_of_China.svg.png'},
  ]

  isHome !: boolean;


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
    private notificationWebSocket: NotificationWebSocketService,
    private personalizationService : PersonalizationService,
    private translate: TranslateService
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

  linkImage!:string;
  changeLanguage(sigla: string, link: string) {
    this.translate.use(sigla);
    this.linkImage = link;
    this.personalizationService.changeLanguage({language:sigla}, this.userService.getLogged().id).subscribe(
      (res: User) => {
        this.userService.saveLoggedUser(res);
        this.updateLocation(this.router.url);
    });
  }



  locationTranslation: string = "";
  ngOnInit() {
    this.translates.forEach((language) => {
      if(language.sigla == this.userService.getLogged().personalization.language){
        this.linkImage = language.image;
      }
    });
    this.translate.get('pages.' + this.location.toLowerCase()).subscribe((res: string) => {
      this.locationTranslation = res || this.location;
    });

  }

  @Output()
  openNotification = new EventEmitter();

  openNotifications(): void {
    this.openNotification.emit();
  }

  updateLocation(activeRoute: string): void {
    this.isHome = activeRoute.includes('home');
    this.locations
      .find((loc: LocationItem) => {
        if (activeRoute.includes(loc.url)) {
          this.location = this.translate.instant('components.fixed-components.header.' + loc.name.toLowerCase());
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
      }, (error) => this.location = error.error.text)
  }

  getUser(id: number): void {
    this.userService
      .getOneById(id)
      .subscribe((user: User) => {
        this.location += " " + user.firstName!;
      })
  }

}
