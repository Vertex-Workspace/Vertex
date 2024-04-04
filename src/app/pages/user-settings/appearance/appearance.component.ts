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


  logged !: User;

  checked!: boolean;
  checked2!: boolean;

  themesList!: any[];

  newPers!: Personalization;

  constructor(
    private userService: UserService,
  ) {
  }
  // Sets the theme by default and make the persistence of the theme in this component
  ngOnInit(): void {
    this.logged = this.userService.getLogged();
    console.log(this.logged);

    this.userService.getOneById(this.logged.id!).pipe(take(1)).subscribe((user) => {
      this.newPers.primaryColorLight = user.personalization?.primaryColorLight!;
      this.newPers.secondColorLight = user.personalization?.secondColorLight!;
      this.newPers.primaryColorDark = user.personalization?.primaryColorDark!;
      this.newPers.secondColorDark = user.personalization?.secondColorDark!;
      this.newPers.theme = user.personalization?.theme!;

      this.themesList = [
        {
          mode: 'Tema Claro', icon: faSun, status: "selected", secondColor: "#F3F3F3",
          primaryColor: this.newPers.primaryColorLight,
          types: [
            {
              title: "Cor Destaque",
              iconColor: '#000000',
              colors: [
                { 'color': '#007bff', status: 'selected' }, // Azul
                { 'color': '#28a745', status: 'unselected' }, // Verde
                { 'color': '#dc3545', status: 'unselected' }, // Vermelho
                { 'color': '#ffc107', status: 'unselected' }, // Amarelo
                { 'color': '#6610f2', status: 'unselected' }, // Roxo
                { 'color': '#17a2b8', status: 'unselected' }, // Azul claro
                { 'color': '#fd7e14', status: 'unselected' }, // Laranja
                { 'color': '#6f42c1', status: 'unselected' }, // Roxo escuro
                { 'color': '#20c997', status: 'unselected' }, // Verde claro
                { 'color': '#e83e8c', status: 'unselected' }, // Rosa
                { 'color': '#ff8fff', status: 'unselected' }, // Rosa claro
                { 'color': '#007b5e', status: 'unselected' }, // Verde azulado
              ]
            },
          ]
        },
        {
          mode: 'Tema Escuro', icon: faMoon, status: "unselected", secondColor: "#1E1E1E", primaryColor: this.newPers.primaryColorDark,
          types: [
            {
              title: "Cor Destaque", iconColor: '#F3F3F3',
              colors: [
                { 'color': '#17a2b8', status: 'selected' }, // Azul claro
                { 'color': '#fd7e14', status: 'unselected' }, // Laranja
                { 'color': '#20c997', status: 'unselected' }, // Verde claro
                { 'color': '#e83e8c', status: 'unselected' }, // Rosa
                { 'color': '#ff8fff', status: 'unselected' }, // Rosa claro
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
      if (this.newPers.theme == 0) {
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

      this.newPers.fontSize = user.personalization?.fontSize!;
      this.newPers.fontFamily = user.personalization?.fontFamily!;
      this.newPers.signLanguage = user.personalization?.signLanguage!;
      this.newPers.listeningText = user.personalization?.listeningText!;
    });
    console.log(this.logged, "LOGGED");

    this.newPers = this.logged.personalization!;

    console.log(this.newPers, "NEWPERS");
  }

  changeThemesListSelected() {
    this.themesList.forEach((themes) => {
      if (themes.mode == "Tema Claro") {
        themes.types.forEach((type: any) => {
          type.colors.forEach((color: any) => {
            if (color.color == this.newPers.primaryColorLight || color.color == this.newPers.secondColorLight) {
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
            if (color.color == this.newPers.primaryColorDark || color.color == this.newPers.secondColorDark) {
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
    this.newPers.signLanguage = !this.newPers.signLanguage;

    this.userService.patchPersonalization(this.newPers).subscribe((userWithNewPersonalization) => {
      this.logged = userWithNewPersonalization;
      localStorage.setItem("logged", JSON.stringify(this.logged))
    });

    return this.newPers.signLanguage;
  }

  toggleChangeListening(): boolean {
    this.newPers.listeningText = !this.newPers.listeningText;

    this.userService.patchPersonalization(this.newPers).subscribe((userWithNewPersonalization) => {
      this.logged = userWithNewPersonalization;
      localStorage.setItem("logged", JSON.stringify(this.logged))
    });
    return this.newPers.listeningText;
  }

  fontSizes: number[] = [
    12, 14, 15, 16, 18, 20
  ]

  fontFamily = [
    'Inter', 'Helvetica', 'Courier New', 'Arial', 'system-ui', 'Times New Roman'
  ];


  selectColor(theme: any, type: any, item: any) {
    type.colors.forEach((element: { status: string; }) => {
      element.status = 'unselected';
    });
    
    type.colors[item].status = 'selected';
    if (type.title === 'Cor Destaque' && this.newPers.theme === 0) {
      this.newPers.primaryColorLight = type.colors[item].color;
      theme.primaryColor = type.colors[item].color;
      document.documentElement.style.setProperty('--primaryColor', this.logged.personalization?.primaryColorLight!);
    }
    if (type.title === 'Cor Destaque' && this.newPers.theme === 1) {
      theme.primaryColor = type.colors[item].color;
      this.newPers.primaryColorDark = type.colors[item].color;
      document.documentElement.style.setProperty('--primaryColor', type.colors[item].color);
    }

    document.documentElement.style.transition = 'color 0.5s, background-color 0.5s';
    console.log(this.newPers, "newPers");

    setTimeout(() => {
      this.userService.patchPersonalization(this.newPers).subscribe((userWithNewPersonalization) => {
        this.logged = userWithNewPersonalization;
        this.newPers = userWithNewPersonalization.personalization!;
        localStorage.setItem("logged", JSON.stringify(this.logged))
        console.log(this.logged.personalization);
        if (this.logged.personalization!.theme == 0) {
          document.documentElement.style.setProperty('--primaryColor', this.newPers.primaryColorLight!);
          document.documentElement.style.setProperty('--secondColor', this.newPers.secondColorLight!);
          document.documentElement.style.setProperty('--emphasis', "#D9D9D9");
          document.documentElement.style.setProperty('--card', "#FFFFFF");
          document.documentElement.style.setProperty('--text', "#000000");
        } else if (this.logged.personalization!.theme == 1) {
          document.documentElement.style.setProperty('--primaryColor', this.newPers.primaryColorDark!);
          document.documentElement.style.setProperty('--secondColor', this.newPers.secondColorDark!);
          document.documentElement.style.setProperty('--emphasis', "#161616");
          document.documentElement.style.setProperty('--card', "#161616");
          document.documentElement.style.setProperty('--text', "#BABABA");
        }
      });
    }, 800); 
  }


  selectTheme(item: any) {
    this.themesList.forEach((theme) => {
      theme.status = 'unselected';
    });
    this.themesList[item].status = 'selected';
    this.newPers.theme = item;
  
    // seleciona a cor de destaque 
    const selectedColor = this.themesList[item].types[0].colors.find((color: any) => color.status === 'selected');
    const selectedColorIndex = this.themesList[item].types[0].colors.indexOf(selectedColor);
  
    // chama selectColor para atualizar a cor de destaque
    this.selectColor(this.themesList[item], this.themesList[item].types[0], selectedColorIndex);
  
    this.userService.patchPersonalization(this.newPers).subscribe((userWithNewPersonalization) => {
      this.logged = userWithNewPersonalization;
  
      localStorage.setItem("logged", JSON.stringify(this.logged));
  
      if (this.logged.personalization!.theme == 0) {
        document.documentElement.style.setProperty('--primaryColor', this.newPers.primaryColorLight!);
        document.documentElement.style.setProperty('--secondColor', this.newPers.secondColorLight!);
        document.documentElement.style.setProperty('--emphasis', "#D9D9D9");
        document.documentElement.style.setProperty('--card', "#FFFFFF");
        document.documentElement.style.setProperty('--text', "#000000");
      } else if (this.logged.personalization!.theme == 1) {
        document.documentElement.style.setProperty('--primaryColor', this.newPers.primaryColorDark!);
        document.documentElement.style.setProperty('--secondColor', this.newPers.secondColorDark!);
        document.documentElement.style.setProperty('--emphasis', "#161616");
        document.documentElement.style.setProperty('--card', "#161616");
        document.documentElement.style.setProperty('--text', "#BABABA");
      }
    });
  }

  changeFontFamily() {
    console.log(this.newPers, "newPers");
    this.userService.patchPersonalization(this.newPers).subscribe((userWithNewPersonalization) => {
      
      this.logged = userWithNewPersonalization;
      localStorage.setItem("logged", JSON.stringify(this.logged));
      document.documentElement.style.setProperty('--fontFamily', this.logged.personalization?.fontFamily!);
    })
  }

  changeFontSize() {
    let smallText = this.newPers.fontSize! - 2;
    console.log(smallText);

    let regularText = this.newPers.fontSize;
    let mediumText = Number(this.newPers.fontSize) + 2;
    let largeText = Number(this.newPers.fontSize) + 4;

    this.userService.patchPersonalization(this.newPers).subscribe((userWithNewPersonalization) => {
      this.logged = userWithNewPersonalization

      localStorage.setItem("logged", JSON.stringify(this.logged));
      document.documentElement.style.setProperty('--smallText', smallText + 'px');
      document.documentElement.style.setProperty('--regularText', regularText + 'px');
      document.documentElement.style.setProperty('--mediumText', mediumText + 'px');
      document.documentElement.style.setProperty('--largeText', largeText + 'px');

    })
  }

  getSelectedOptions(): void {
    this.newPers.fontSize = this.logged.personalization!.fontSize!;
    this.newPers.fontFamily = this.logged.personalization!.fontFamily!;
  }

}