import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
      title: 'Rastreie o tempo da sua equipe.', description: `
    
      <ul>
        <li><strong>Registro de Tempo:</strong><br> Permite que os membros da equipe registrem o tempo gasto em tarefas específicas do projeto.<br> Os usuários podem iniciar, pausar e parar o cronômetro para registrar com precisão o tempo dedicado a cada atividade.</li>
        <li><strong>Atribuição de Tempo a Tarefas:</strong><br> Associa automaticamente o tempo registrado a tarefas específicas ou subtarefas dentro do projeto.<br> Facilita a identificação das atividades que consomem mais tempo e otimiza a distribuição de recursos.</li>
        <li><strong>Visualização de Dados:</strong><br> Apresenta relatórios detalhados sobre o tempo gasto em diferentes tarefas, projetos ou por membros da equipe.<br> Gráficos e tabelas oferecem uma visão clara do tempo total gasto, tempo médio por tarefa e variações ao longo do tempo.</li>
      </ul>
    
    `, image: "../../assets/kanban.png"
    },
    { title: 'Title 2', description: "", image: "../../assets/kanban.png" },
    { title: 'Title 3', description: "", image: "../../assets/kanban.png" },
    { title: 'Title 4', description: "", image: "../../assets/kanban.png" },
  ];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  project: any;

  constructor(private translate: TranslateService, private personalizationService: PersonalizationService, private userService: UserService, private router: Router) {
    if (document.cookie.includes("JWT")) {
      this.router.navigate(['/home']);
    }
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



}
