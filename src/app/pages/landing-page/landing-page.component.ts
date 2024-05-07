import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/class/user';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  constructor(private translate: TranslateService, private personalizationService: PersonalizationService, private userService: UserService) { }

  translates: any[] = [
    { sigla: 'pt', image: 'https://www.gov.br/mre/pt-br/embaixada-seul/arquivos/imagens/BRASIL.png' },
    { sigla: 'es', image: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/bandeira-espanha-55c26319db07f.jpg' },
    { sigla: 'en', image: 'https://s3.static.brasilescola.uol.com.br/be/conteudo/images/estados-unidos.jpg' },
    { sigla: 'zh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/2560px-Flag_of_the_People%27s_Republic_of_China.svg.png' },
  ]


  linkImage: string = 'https://www.gov.br/mre/pt-br/embaixada-seul/arquivos/imagens/BRASIL.png';
  changeLanguage(sigla: string, link: string) {
    this.translate.use(sigla);
    this.linkImage = link;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
