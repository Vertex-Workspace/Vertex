import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener } from '@angular/core';
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
export class LandingPageComponent {

  positionOptions: any;
  position: any;
  label: any;
  showIndicatorsOnItem: any;


  images: any[] = [
    {
      title: 'Gerencie seu Tempo de Ponta a Ponta', description: `
    
      <ul>
        <li><strong>Registro de Tempo:</strong><br> Permite que os membros da equipe registrem o tempo gasto em tarefas específicas do projeto.<br> Os usuários podem iniciar, pausar e parar o cronômetro para registrar com precisão o tempo dedicado a cada atividade.</li>
        <li><strong>Atribuição de Tempo a Tarefas:</strong><br> Associa automaticamente o tempo registrado a tarefas específicas ou subtarefas dentro do projeto.<br> Facilita a identificação das atividades que consomem mais tempo e otimiza a distribuição de recursos.</li>
        <li><strong>Visualização de Dados:</strong><br> Apresenta relatórios detalhados sobre o tempo gasto em diferentes tarefas, projetos ou por membros da equipe.<br> Gráficos e tabelas oferecem uma visão clara do tempo total gasto, tempo médio por tarefa e variações ao longo do tempo.</li>
      </ul>
    
    `, image: "../../assets/time.png"
    },
    {
      title: 'Planeje, Acompanhe e Revise', description: `

      <ul>
      <li><strong>Avaliação de Tarefas:</strong><br> Permite que os membros da equipe revisem e avaliem as tarefas atribuídas a eles ou a outros membros da equipe.<br> Os revisores podem fornecer feedback específico sobre o progresso, qualidade e conformidade das tarefas com os requisitos do projeto.</li>
      <li><strong>Colaboração Eficiente:</strong><br> Facilita a comunicação entre os membros da equipe, permitindo que compartilhem comentários, sugestões e correções diretamente nas tarefas revisadas.<br> Promove a transparência e a colaboração ao oferecer uma plataforma centralizada para discutir e resolver questões relacionadas às tarefas.</li>
      <li><strong>Validação de Qualidade:</strong><br> Ajuda a garantir a qualidade do trabalho realizado pela equipe, fornecendo uma oportunidade para identificar e corrigir erros, inconsistências ou lacunas nas tarefas.<br> Auxilia na conformidade com os padrões de qualidade e nas melhores práticas estabelecidas pelo projeto ou pela organização.</li>
      </ul>
    
    `, image: "../../assets/reviewTask.png"
    },
    {
      title: 'Comunicação é a chave para o Sucesso', description: `
    
      <ol>
      <li><strong>Comunicação em Tempo Real:</strong><ul><li>Permite que os membros da equipe se comuniquem instantaneamente entre si, independentemente da localização geográfica.</li><li>Facilita a troca de informações, atualizações e discussões importantes em tempo real.</li></ul></li>
      <li><strong>Colaboração Eficiente:</strong><ul><li>Promove a colaboração em projetos, permitindo que os membros discutam ideias, compartilhem feedback e tomem decisões em conjunto.</li><li>Facilita a coordenação de esforços e o trabalho em equipe para alcançar metas comuns de maneira mais eficaz.</li></ul></li>
      <li><strong>Chat Integrado:</strong><ul> <li>Facilite a comunicação entre os membros da equipe com um chat integrado em cada tarefa do projeto.</li> <li>Permite que os usuários discutam detalhes, compartilhem arquivos e resolvam problemas diretamente na plataforma.</li></ul></li>
      </ol>

    `, image: "../../assets/sendMessages.png"
    }
  ];
  project: any;

  constructor(private translate: TranslateService, private personalizationService: PersonalizationService, private userService: UserService, private router: Router) {
    if (document.cookie.includes("JWT")) {
      this.router.navigate(['/home']);
    }

    this.toggleRightChat()
  }

  translates: any[] = [
    { sigla: 'pt', image: 'https://www.gov.br/mre/pt-br/embaixada-seul/arquivos/imagens/BRASIL.png' },
    { sigla: 'es', image: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/bandeira-espanha-55c26319db07f.jpg' },
    { sigla: 'en', image: 'https://s3.static.brasilescola.uol.com.br/be/conteudo/images/estados-unidos.jpg' },
    { sigla: 'zh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/2560px-Flag_of_the_People%27s_Republic_of_China.svg.png' },
  ]

  columns: any[] = [
    { status: 'Não Iniciada', color: '#d3e5ef' },
    { status: 'Em andamento', color: '#ffe2dd' },
    { status: 'Pausado', color: '#e8deee' },
    { status: 'Concluída', color: '#f5e0e9' },
  ]

  tasks: any[] = [
    { name: 'Tarefa 1', status: this.columns[0] },
    { name: 'Tarefa 2', status: this.columns[1] },
    { name: 'Tarefa 3', status: this.columns[2] },
  ]


  drop(e: any, col: any) {
    console.log(e);
    e.item.data.status = col;

    console.log(e.item.data);
    console.log(col);

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
    this.navigation=false;
  }

  createTask(col: any) {
    this.tasks.push({ name: `Tarefa ${this.tasks.length + 1}`, status: col });

  }

  getHeight(propertyList: any): string {
    return ((this.specificPropertyArray(propertyList).length * 150) + 60) + "px";
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
    // Chama toggleRightChat() sempre que o tamanho da tela for alterado
    this.toggleRightChat();
  }

  resposive:boolean=false;

  toggleRightChat() {
    if (window.innerWidth < 1024) {
      this.resposive=true;
    }else{
      this.resposive=false;
      this.navigation=false;
    }
  }

  navigation: boolean = false;
  openNavigation() {
    this.navigation=!this.navigation;
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






}
