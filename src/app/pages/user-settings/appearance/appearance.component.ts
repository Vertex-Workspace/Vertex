import { Component, OnInit } from '@angular/core';
import { faPencil, faSun, faMoon, faToggleOff, faToggleOn, faCheck } from '@fortawesome/free-solid-svg-icons';
import { PersonalizationService } from '../../../services/personalization.service';
import { Personalization } from '../../../models/personalization';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import TypedRegistry from 'chart.js/dist/core/core.typedRegistry';

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

  logged !: User;
  primary!: string;
  second!: string;
  theme!: number;

  themesList!: any[];


  ngOnInit(): void {
    this.logged = this.userService.getLogged();

    this.userService.getOneById(this.logged.id!).subscribe((user) => {

      this.primary = user.personalization?.primaryColor!;
      this.second = user.personalization?.secondColor!;
      this.theme = user.personalization?.theme!;

      this.themesList = [
        {
          mode: 'Tema Claro',
          icon: faSun,
          status: "selected",
          secondColor: this.second,
          primaryColor: this.primary,
          types: [
            {
              title: "Cor de Fundo",
              iconColor: '#000000',
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
              title: "Cor Primária",
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
          status: "unselected",
          secondColor: this.second,
          primaryColor: this.primary,
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
              title: "Cor Primária",
              iconColor: '#000000',
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
      ];


      if (this.theme == 0) {
        this.themesList[0].status = 'selected';
        this.themesList[1].status = 'unselected';
      } else {
        this.themesList[1].status = 'selected';
        this.themesList[0].status = 'unselected';
      }





      this.changeThemesListSelected();
      this.saveTheme();
      console.log(this.themesList);
    })
  }


  changeThemesListSelected() {

    this.themesList.forEach((themes) => {
      if (themes.mode == "Tema Claro") {

        themes.types.forEach((type: any) => {



          type.colors.forEach((color: any) => {

            if (color.color == this.primary || color.color == this.second) {
              type.colors.forEach((color: any) => {
                color.status = 'unselected';
              })
              color.status = 'selected';
            }

          })
        }, this);
      } else if (themes.mode == "Tema Escuro") {

        themes.types.forEach((type: any) => {

          type.colors.forEach((color: any) => {

            if (color.color == this.primary || color.color == this.second) {
              type.colors.forEach((color: any) => {
                color.status = 'unselected';
              })
              color.status = 'selected';
            }

          })
        }, this);
      }
    })

  }


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


  selectColor(theme: any, type: any, item: any): void {

    this.foreachColors(theme, type, item);
    let newPers = new Personalization({
      id: this.logged.id!,
      primaryColor: theme.primaryColor,
      secondColor: theme.secondColor,
      fontFamily: this.fontFamily[0],
      fontSize: parseInt(this.fontSizes[0]),
      theme: this.theme,
      voiceCommand: true,
      listeningText: true
    });

    this.userService.patchPersonalization(newPers).subscribe((pers) => {

      this.logged.personalization = pers;
      localStorage.setItem("logged", JSON.stringify(this.logged))
      console.log(this.logged.personalization);
    })

  }

  foreachColors(theme: any, type: any, item: number): void {
    type.colors.forEach((element: { status: string; }) => {
      element.status = 'unselected';

      type.colors[item].status = 'selected';
      if (type.title === 'Cor Primária' && theme.mode === 'Tema Claro') {
        theme.primaryColor = type.colors[item].color;
        document.documentElement.style.setProperty('--primaryColor', type.colors[item].color);
      }
      if (type.title === 'Cor Primária' && theme.mode === 'Tema Escuro') {
        theme.primaryColor = type.colors[item].color;
        document.documentElement.style.setProperty('--primaryColor', type.colors[item].color);
      }
      if (type.title === 'Cor de Fundo' && theme.mode === 'Tema Claro') {
        theme.secondColor = type.colors[item].color;
        document.documentElement.style.setProperty('--secondColor', type.colors[item].color);
      }
      if (type.title === 'Cor de Fundo' && theme.mode === 'Tema Escuro') {
        theme.secondColor = type.colors[item].color;
        document.documentElement.style.setProperty('--secondColor', type.colors[item].color);
      }
    });
  }

  selectTheme(item: any): void {

    console.log(this.themesList);


    // this.saveTheme();

    this.theme = item;



    this.themesList.forEach((element: { status: string; }) => {
      element.status = 'unselected';
    });

    this.themesList[this.theme].status = 'selected';

  }

  saveTheme(): void {
    const newPers = new Personalization({
      id: this.logged.id!,
      primaryColor: this.primary,
      secondColor: this.second,
      fontFamily: this.fontFamily[0],
      fontSize: parseInt(this.fontSizes[0]),
      theme: this.theme,
      voiceCommand: true,
      listeningText: true
    });



    this.userService.patchPersonalization(newPers).subscribe((pers) => {
      this.logged.personalization = pers;
      localStorage.setItem("logged", JSON.stringify(this.logged))
      console.log(this.logged.personalization);
    })
  }

}
