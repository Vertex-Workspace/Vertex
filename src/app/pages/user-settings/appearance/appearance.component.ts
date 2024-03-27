import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { faPencil, faSun, faMoon, faToggleOff, faToggleOn, faCheck } from '@fortawesome/free-solid-svg-icons';
import { PersonalizationService } from '../../../services/personalization.service';
import { Personalization } from '../../../models/class/personalization';
import { User } from 'src/app/models/class/user';
import { UserService } from '../../../services/user.service';
import TypedRegistry from 'chart.js/dist/core/core.typedRegistry';
import { take } from 'rxjs';

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

  constructor(
    private personalizationService: PersonalizationService,
    private userService: UserService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  logged !: User;
  primaryLight!: string;
  secondLight!: string;
  primaryDark!: string;
  secondDark!: string;
  theme!: number;
  selectedFontSize !: number;
  selectedFontFamily!: string;
  voiceCommand!: boolean;
  listeningText!: boolean;
  checked!: boolean;
  checked2!: boolean;

  themesList!: any[];

  // Sets the theme by default and make the persistence of the theme in this component
  ngOnInit(): void {
    this.logged = this.userService.getLogged();

    this.userService.getOneById(this.logged.id!).pipe(take(1)).subscribe((user) => {
      this.primaryLight = user.personalization?.primaryColorLight!;
      this.secondLight = user.personalization?.secondColorLight!;
      this.primaryDark = user.personalization?.primaryColorDark!;
      this.secondDark = user.personalization?.secondColorDark!;
      this.theme = user.personalization?.theme!;

      this.themesList = [
        {
          mode: 'Tema Claro',
          icon: faSun,
          status: "selected",
          secondColor: "#F3F3F3",
          primaryColor: this.primaryLight,
          types: [
            {
              title: "Cor Destaque",
              iconColor: '#000000',
              colors: [
                { 'color': '#007bff', status: 'unselected' }, // Azul
                { 'color': '#28a745', status: 'unselected' }, // Verde
                { 'color': '#dc3545', status: 'unselected' }, // Vermelho
                { 'color': '#ffc107', status: 'unselected' }, // Amarelo
                { 'color': '#6610f2', status: 'unselected' }, // Roxo
                { 'color': '#17a2b8', status: 'unselected' }, // Azul claro
                { 'color': '#fd7e14', status: 'unselected' }, // Laranja
                { 'color': '#6f42c1', status: 'unselected' }, // Roxo escuro
                { 'color': '#20c997', status: 'unselected' }, // Verde claro
                { 'color': '#e83e8c', status: 'unselected' }, // Rosa
                { 'color': '#ffc0cb', status: 'unselected' }, // Rosa claro
                { 'color': '#007b5e', status: 'unselected' }, // Verde azulado
              ]
            },
          ]
        },
        {
          mode: 'Tema Escuro',
          icon: faMoon,
          status: "unselected",
          secondColor: "#1E1E1E",
          primaryColor: this.primaryDark,
          types: [
            {
              title: "Cor Destaque",
              iconColor: '#F3F3F3',
              colors: [
                { 'color': '#17a2b8', status: 'selected' }, // Azul claro
                { 'color': '#fd7e14', status: 'unselected' }, // Laranja
                { 'color': '#20c997', status: 'unselected' }, // Verde claro
                { 'color': '#e83e8c', status: 'unselected' }, // Rosa
                { 'color': '#ffc0cb', status: 'unselected' }, // Rosa claro
                { 'color': '#007b5e', status: 'unselected' }, // Verde azulado
                { 'color': '#007bff', status: 'unselected' }, // Azul
                { 'color': '#28a745', status: 'unselected' }, // Verde
                { 'color': '#dc3545', status: 'unselected' }, // Vermelho
                { 'color': '#ffc107', status: 'unselected' }, // Amarelo
                { 'color': '#ADFF2F', status: 'unselected' }, // Roxo
                { 'color': '#6f42c1', status: 'unselected' }, // Roxo escuro
              ]
            },
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
      // this.saveTheme();
      // this.changeFont(this.fontFamily[0]);  
      console.log(this.themesList);


      this.selectedFontSize = user.personalization?.fontSize!;
      this.selectedFontFamily = user.personalization?.fontFamily!;
      this.voiceCommand = user.personalization?.voiceCommand!;
      this.listeningText = user.personalization?.listeningText!;
    });
  }

  changeThemesListSelected() {
    this.themesList.forEach((themes) => {
      if (themes.mode == "Tema Claro") {
        themes.types.forEach((type: any) => {
          type.colors.forEach((color: any) => {
            if (color.color == this.primaryLight || color.color == this.secondLight) {
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
            if (color.color == this.primaryDark || color.color == this.secondDark) {
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

  toggleChangeVoice(): boolean {
    this.voiceCommand = !this.voiceCommand;

    let newPers = new Personalization({
      id: this.logged.id!,
      primaryColorLight: this.themesList[0].primaryColor,
      secondColorLight: this.themesList[0].secondColor,
      primaryColorDark: this.themesList[1].primaryColor,
      secondColorDark: this.themesList[1].secondColor,
      fontFamily: this.selectedFontFamily,
      fontSize: this.selectedFontSize,
      theme: this.theme,
      voiceCommand: this.voiceCommand,
      listeningText: this.listeningText
    });

    this.userService.patchPersonalization(newPers).subscribe((pers) => {
      this.logged.personalization = pers.personalization;
      localStorage.setItem("logged", JSON.stringify(this.logged))
    });

    return this.voiceCommand;
  }

  toggleChangeListening(): boolean {
    this.listeningText = !this.listeningText;

    let newPers = new Personalization({
      id: this.logged.id!,
      primaryColorLight: this.themesList[0].primaryColor,
      secondColorLight: this.themesList[0].secondColor,
      primaryColorDark: this.themesList[1].primaryColor,
      secondColorDark: this.themesList[1].secondColor,
      fontFamily: this.selectedFontFamily,
      fontSize: this.selectedFontSize,
      theme: this.theme,
      voiceCommand: this.voiceCommand,
      listeningText: this.listeningText
    });

    this.userService.patchPersonalization(newPers).subscribe((pers) => {
      this.logged.personalization = pers.personalization;
      localStorage.setItem("logged", JSON.stringify(this.logged))
    });
    return this.listeningText;
  }

  fontSizes: number[] = [
    12, 14, 15, 16, 18, 20
  ]

  fontFamily = [
    'Inter', 'Helvetica', 'Courier New', 'Arial', 'system-ui', 'Times New Roman'
  ];


  async selectColor(theme: any, type: any, item: any) {
    await this.foreachColors(theme, type, item);

    let newPers = new Personalization({
      id: this.logged.id!,
      primaryColorLight: this.themesList[0].primaryColor,
      secondColorLight: this.themesList[0].secondColor,
      primaryColorDark: this.themesList[1].primaryColor,
      secondColorDark: this.themesList[1].secondColor,
      fontFamily: this.selectedFontFamily,
      fontSize: this.selectedFontSize,
      theme: this.theme,
      voiceCommand: true,
      listeningText: true
    });

    console.log(newPers, "newPers");

    this.userService.patchPersonalization(newPers).subscribe((pers) => {
      this.logged.personalization = pers.personalization;
      localStorage.setItem("logged", JSON.stringify(this.logged))
      console.log(this.logged.personalization);
      if (this.logged.personalization!.theme == 0) {
        document.documentElement.style.setProperty('--primaryColor', this.logged.personalization?.primaryColorLight!);
        document.documentElement.style.setProperty('--secondColor', this.logged.personalization?.secondColorLight!);
      } else if (this.logged.personalization!.theme == 1) {
        document.documentElement.style.setProperty('--primaryColor', this.logged.personalization?.primaryColorDark!);
        document.documentElement.style.setProperty('--secondColor', this.logged.personalization?.secondColorDark!);
      }
    });
  }

  async foreachColors(theme: any, type: any, item: number) {
    -
      type.colors.forEach((element: { status: string; }) => {
        element.status = 'unselected';

        type.colors[item].status = 'selected';
        if (type.title === 'Cor Destaque' && theme.mode === 'Tema Claro') {
          theme.primaryColor = type.colors[item].color;
          document.documentElement.style.setProperty('--primaryColor', this.logged.personalization?.primaryColorLight!);

          console.log(theme.primaryColor);
        }
        if (type.title === 'Cor Destaque' && theme.mode === 'Tema Escuro') {
          theme.primaryColor = type.colors[item].color;
          document.documentElement.style.setProperty('--primaryColor', type.colors[item].color);
        }

      });
  }

  selectTheme(item: any) {
    this.themesList.forEach((theme) => {
      theme.status = 'unselected';
    })
    this.themesList[item].status = 'selected';
    this.theme = item;
    this.saveTheme();
  }

  saveTheme() {
    let newPers = new Personalization({
      id: this.logged.id!,
      primaryColorLight: this.themesList[0].primaryColor,
      secondColorLight: this.themesList[0].secondColor,
      primaryColorDark: this.themesList[1].primaryColor,
      secondColorDark: this.themesList[1].secondColor,
      fontFamily: this.selectedFontFamily,
      fontSize: this.selectedFontSize,
      theme: this.theme,
      voiceCommand: true,
      listeningText: true
    });

    this.userService.patchPersonalization(newPers).subscribe((pers) => {
      this.logged.personalization = pers.personalization;

      localStorage.setItem("logged", JSON.stringify(this.logged));

      if (this.logged.personalization!.theme == 0) {
        document.documentElement.style.setProperty('--primaryColor', this.logged.personalization?.primaryColorLight!);
        document.documentElement.style.setProperty('--secondColor', this.logged.personalization?.secondColorLight!);
        document.documentElement.style.setProperty('--text', "#000000");
      } else if (this.logged.personalization!.theme == 1) {
        document.documentElement.style.setProperty('--primaryColor', this.logged.personalization?.primaryColorDark!);
        document.documentElement.style.setProperty('--secondColor', this.logged.personalization?.secondColorDark!);
        document.documentElement.style.setProperty('--text', "#FFFFFF");
      }
    });
  }

  changeFontFamily() {
    let newPers = new Personalization({
      id: this.logged.id!,
      primaryColorLight: this.themesList[0].primaryColor,
      secondColorLight: this.themesList[0].secondColor,
      primaryColorDark: this.themesList[1].primaryColor,
      secondColorDark: this.themesList[1].secondColor,
      fontFamily: this.selectedFontFamily,
      fontSize: this.selectedFontSize,
      theme: this.theme,
      voiceCommand: true,
      listeningText: true
    });

    console.log(newPers, "newPers");


    this.userService.patchPersonalization(newPers).subscribe((pers) => {
      this.logged.personalization = pers.personalization;
      localStorage.setItem("logged", JSON.stringify(this.logged));
      document.documentElement.style.setProperty('--fontFamily', this.logged.personalization?.fontFamily!);
    })
  }

  changeFontSize() {
    let newPers = new Personalization({
      id: this.logged.id!,
      primaryColorLight: this.themesList[0].primaryColor,
      secondColorLight: this.themesList[0].secondColor,
      primaryColorDark: this.themesList[1].primaryColor,
      secondColorDark: this.themesList[1].secondColor,
      fontFamily: this.selectedFontFamily,
      fontSize: this.selectedFontSize,
      theme: this.theme,
      voiceCommand: true,
      listeningText: true
    });

    let smallText = this.selectedFontSize - 2;
    console.log(smallText);

    let regularText = this.selectedFontSize;
    let mediumText = Number(this.selectedFontSize) + 2;
    let largeText = Number(this.selectedFontSize) + 4;

    this.userService.patchPersonalization(newPers).subscribe((pers) => {
      this.logged.personalization = pers.personalization;

      localStorage.setItem("logged", JSON.stringify(this.logged));
      document.documentElement.style.setProperty('--smallText', smallText + 'px');
      document.documentElement.style.setProperty('--regularText', regularText + 'px');
      document.documentElement.style.setProperty('--mediumText', mediumText + 'px');
      document.documentElement.style.setProperty('--largeText', largeText + 'px');

    })
  }

  getSelectedOptions(): void {
    this.selectedFontSize = this.logged.personalization!.fontSize!;
    this.selectedFontFamily = this.logged.personalization!.fontFamily!;
  }

}