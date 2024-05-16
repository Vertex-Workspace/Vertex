import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ResizeEvent } from 'angular-resizable-element';
import { PropertyCreation, PropertyKind } from 'src/app/models/class/property';
import { User } from 'src/app/models/class/user';
import { colors } from 'src/app/models/colors';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  positionOptions: any;
  position: any;
  label: any;
  showIndicatorsOnItem: any;

  images: any[] = [];

  project: any;

  constructor(
    private translate: TranslateService,
    private personalizationService: PersonalizationService,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private router: Router) {
    if (document.cookie.includes("JWT")) {
      this.router.navigate(['/home']);
    }

    this.toggleRightChat()
    this.translate.setDefaultLang('pt');

    console.log(this.translate);


    this.translate.onLangChange.subscribe(() => {
      this.loadFeatures();
    });
  }


  ngOnInit(): void {
    this.changeLanguage('pt', 'https://www.gov.br/mre/pt-br/embaixada-seul/arquivos/imagens/BRASIL.png');
    this.loadFeatures();
  }


  translates: any[] = [
    { sigla: 'pt', image: 'https://www.gov.br/mre/pt-br/embaixada-seul/arquivos/imagens/BRASIL.png' },
    { sigla: 'es', image: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/bandeira-espanha-55c26319db07f.jpg' },
    { sigla: 'en', image: 'https://s3.static.brasilescola.uol.com.br/be/conteudo/images/estados-unidos.jpg' },
    { sigla: 'zh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/2560px-Flag_of_the_People%27s_Republic_of_China.svg.png' },
  ]

  columns: any[] = [];


  tasks: any[] = []

  drop(e: any, col: any) {
    e.item.data.status = col;
    moveItemInArray(this.tasks, e.previousIndex, e.currentIndex);
  }

  linkImage: string = 'https://www.gov.br/mre/pt-br/embaixada-seul/arquivos/imagens/BRASIL.png';
  changeLanguage(sigla: string, link: string) {
    this.translate.use(sigla);
    this.linkImage = link;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  scroll2(el: HTMLElement) {
    el.scrollIntoView();
    this.navigation = false;
  }

  createTask(col: any) {
    this.tasks.push({ name: `${this.translate.instant('pages.landing-page.NEW_TASK')} ${this.tasks.length + 1}`, status: col });
  }

  specificPropertyArray(propertyList: any): any[] {
    return this.tasks.filter(task => {
      return task.status == propertyList;
    });
  }

  getStrongerColor(colorReceived: string): string | undefined {
    const matchingColor = colors.find(color => color.weak === colorReceived);
    return matchingColor ? matchingColor.strong : undefined;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: ResizeEvent) {
    this.toggleRightChat();
  }

  resposive: boolean = false;

  toggleRightChat() {
    if (window.innerWidth < 1024) {
      this.resposive = true;
    } else {
      this.resposive = false;
      this.navigation = false;
    }
  }

  navigation: boolean = false;
  openNavigation() {
    this.navigation = !this.navigation;
  }

  @HostListener('window:scroll', ['$event'])
  listen(event: any) {
    this.applyAnimation('principles1', 'scroll-smoothPrinciplesRight');
    this.applyAnimation('principles2', 'scroll-smoothPrinciplesLeft');
    this.applyAnimation('principles3', 'scroll-smoothPrinciplesRight');
  }

  applyAnimation(elementId: string, animationClass: string) {
    const element = document.getElementById(elementId) as HTMLElement;
    const elementPosition = element.getBoundingClientRect().top;

    if (elementPosition < window.innerHeight) {
      if (!element.classList.contains(animationClass)) {
        element.classList.add(animationClass);
      }
    } else {
      element.classList.remove(animationClass);
    }
  }

  loadFeatures() {
    const images =
      [
        {
          title: this.translate.instant('pages.landing-page.MANAGE_TIME'),
          description: [
            { title: this.translate.instant('pages.landing-page.TIME_TRACKING'), description: this.translate.instant('pages.landing-page.TIME_TRACKING_DESC') },
            { title: this.translate.instant('pages.landing-page.ASSIGN_TIME_TO_TASKS'), description: this.translate.instant('pages.landing-page.ASSIGN_TIME_TO_TASKS_DESC') },
            { title: this.translate.instant('pages.landing-page.DATA_VISUALIZATION'), description: this.translate.instant('pages.landing-page.DATA_VISUALIZATION_DESC') }
          ],
          image: "../../assets/time.png"
        },
        {
          title: this.translate.instant('pages.landing-page.PLAN_TRACK_REVIEW'),
          description:
            [
              { title: this.translate.instant('pages.landing-page.TASK_REVIEW'), description: this.translate.instant('pages.landing-page.TASK_REVIEW_DESC') },
              { title: this.translate.instant('pages.landing-page.EFFICIENT_COLLABORATION'), description: this.translate.instant('pages.landing-page.EFFICIENT_COLLABORATION_DESC') },
              { title: this.translate.instant('pages.landing-page.QUALITY_VALIDATION'), description: this.translate.instant('pages.landing-page.QUALITY_VALIDATION_DESC') }
            ],
          image: "../../assets/reviewTask.png"
        },
        {
          title: this.translate.instant('pages.landing-page.COMMUNICATION_IS_KEY'),
          description:
            [
              { title: this.translate.instant('pages.landing-page.REAL_TIME_COMMUNICATION'), description: this.translate.instant('pages.landing-page.REAL_TIME_COMMUNICATION_DESC') },
              { title: this.translate.instant('pages.landing-page.EFFICIENT_COLLABORATION'), description: this.translate.instant('pages.landing-page.EFFICIENT_COLLABORATION_DESC') },
              { title: this.translate.instant('pages.landing-page.INTEGRATED_CHAT'), description: this.translate.instant('pages.landing-page.INTEGRATED_CHAT_DESC') }
            ]
          , image: "../../assets/sendMessages.png"
        }];
    this.images = [...images];

    this.columns = [
      { status: this.translate.instant('pages.landing-page.NOT_STARTED'), color: '#f5e0e9' },
      { status: this.translate.instant('pages.landing-page.IN_PROGRESS'), color: '#e8deee'},
      { status: this.translate.instant('pages.landing-page.PAUSED'), color: '#d3e5ef' },
      { status: this.translate.instant('pages.landing-page.COMPLETED'), color: '#ffe2dd' },
    ]

    this.tasks = [
      { name: this.translate.instant('pages.landing-page.NEW_TASK')+" 1", status: this.columns[0] },
      { name: this.translate.instant('pages.landing-page.NEW_TASK')+" 2", status: this.columns[1] },
      { name: this.translate.instant('pages.landing-page.NEW_TASK')+" 3", status: this.columns[1] },
      { name: this.translate.instant('pages.landing-page.NEW_TASK')+" 4", status: this.columns[2] },
    ]
    this.changeDetectorRef.detectChanges();
  }
}
