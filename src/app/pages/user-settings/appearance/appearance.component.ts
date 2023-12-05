import { Component, OnInit } from '@angular/core';
import { faPencil, faSun, faMoon, faToggleOff, faToggleOn, faCheck } from '@fortawesome/free-solid-svg-icons';
import { PersonalizationService } from '../../../services/personalization.service';
import { Personalization } from '../../../models/personalization';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss']
})
export class AppearanceComponent implements OnInit {
  faPencil = faPencil;
  faSun = faSun;
  faMoon = faMoon;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faCheck = faCheck;

  constructor(private personalizationService: PersonalizationService, private userService: UserService) { }

  themesBack!: Personalization[];

  ngOnInit(): void {
  }

  async takeAllPersonalizations() {
    await this.personalizationService.getAllPersonalization().subscribe(
      (personalizations: any) => {
        this.themesBack = personalizations;
        console.log(this.themesBack);
      }
    )
  }

  themesList: any[] = [
    {
      mode: 'Tema Claro',
      icon: faSun,
      status: 'selected',
      secondColor: '#092C4C',
      types: [
        {
          title: "Cor de Fundo",
          iconColor: '$primaryColor',
          colors: [
            { 'color': '#FFFFFF', status: 'unselected' },
            { 'color': '#F3F3F3', status: 'selected' },
            { 'color': '#E5DDF5', status: 'unselected' },
            { 'color': '#DCE8F2', status: 'unselected' },
            { 'color': '#FAEAEA', status: 'unselected' },
            { 'color': '#F5FCF2', status: 'unselected' },
          ]
        },
        {
          title: "Cor Secundária",
          iconColor: '#F3F3F3',
          colors: [
            { 'color': '#092C4C', status: 'selected' },
            { 'color': '#F5B1B1', status: 'unselected' },
            { 'color': '#6F57A1', status: 'unselected' },
            { 'color': '#000000', status: 'unselected' },
            { 'color': '#A5A973', status: 'unselected' },
            { 'color': '#83B172', status: 'unselected' },
          ]
        }
      ]
    },
    {
      mode: 'Tema Escuro',
      icon: faMoon,
      status: 'unselected',
      secondColor: '#F3F3F3',
      types: [
        {
          title: "Cor de Fundo",
          iconColor: '#F3F3F3',
          colors: [
            { 'color': '#574444', status: 'selected' },
            { 'color': '#5B5555', status: 'unselected' },
            { 'color': '#0B2740', status: 'unselected' },
            { 'color': '#464646', status: 'unselected' },
            { 'color': '#787878', status: 'unselected' },
            { 'color': '#322438', status: 'unselected' },
          ]
        },
        {
          title: "Cor Secundária",
          iconColor: '$primaryColor',
          colors: [
            { 'color': '#F3F3F3', status: 'selected' },
            { 'color': '#F5B1B1', status: 'unselected' },
            { 'color': '#A697C6', status: 'unselected' },
            { 'color': '#BEDFF4', status: 'unselected' },
            { 'color': '#FFC1C9', status: 'unselected' },
            { 'color': '#83B172', status: 'unselected' },
          ]
        }
      ]
    }
  ]

  toggles = [
    { text: "Habilitar comando de voz", icon: faToggleOff },
    { text: "Habilitar leitura de texto", icon: faToggleOff },
  ];

  toggleChange(item: number): void {
    if (this.toggles[item].icon == faToggleOn) {
      this.toggles[item].icon = faToggleOff;
    }
    else {
      this.toggles[item].icon = faToggleOn;
    }
  }


  fontSizes = [
    '12 (Padrão)', '14'
  ]

  fontFamily = [
    'Inter (Padrão)', 'Helvetica', 'Times New Roman'
  ];


   selectColor(theme: any, type: any, item: number): void {

    const storedUser = JSON.parse(localStorage.getItem('logged') || '{}');
    const user: User = storedUser ? storedUser : {};

    const newPersonalization: Personalization = {
      id: user.id,
      primaryColor: 8,
      secondColor: 8,
      fontFamily: 1s,
      fontSize: 1,
      listeningText: true,
      voiceCommand: true,
    }


    this.userService.patchPersonalization(newPersonalization).subscribe(
      (personalization: any) => {
        console.log(user);
        
        console.log(personalization);
      }
    );


    // document.documentElement.style.setProperty('--primaryColor', type.colors[item].color);
    // document.documentElement.style.setProperty('--secondColor', theme.secondColor);
    // document.documentElement.style.setProperty('--font-family', 'Inter');
    // const fontSize = this.fontSizes[0].split(' ')[0];

    type.colors.forEach((element: { status: string; }) => {
      element.status = 'unselected';

      type.colors[item].status = 'selected';
      if (type.title === 'Cor Secundária' && theme.mode === 'Tema Claro') {
        this.themesList[0].secondColor = type.colors[item].color;
        // console.log(type.colors[item].color);;


      }
      else if (type.title === 'Cor Secundária' && theme.mode === 'Tema Escuro') {
        this.themesList[1].secondColor = type.colors[item].color;
        // console.log(type.colors[item].color);
      }
    });

  }

  selectTheme(item: number): void {
    this.themesList.forEach((element: { status: string; }) => {
      element.status = 'unselected';
    });
    this.themesList[item].status = 'selected';

  }
}
