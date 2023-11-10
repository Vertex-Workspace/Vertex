import { Component } from '@angular/core';
import { faPencil, faSun, faMoon, faToggleOff, faToggleOn, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss']
})
export class AppearanceComponent {
  faPencil = faPencil;
  faSun = faSun;
  faMoon = faMoon;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faCheck = faCheck;

  themesList: any[] = [
    {
      mode: 'Tema Claro',
      icon: faSun,
      status: 'selected',
      types: [
        {
          title: "Cor de Fundo",
          colors: [
            { 'color': '#FFFFFF', status: 'unselected' },
            { 'color': '#F3F3F3', status: 'unselected' },
            { 'color': '#E5DDF5', status: 'unselected' },
            { 'color': '#DCE8F2', status: 'unselected' },
            { 'color': '#FAEAEA', status: 'unselected' },
            { 'color': '#F5FCF2', status: 'unselected' },
          ]
        },
        {
          title: "Cor Secundária",
          colors: [
            { 'color': '#092C4C', status: 'unselected' },
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
      types: [
        {
          title: "Cor de Fundo",
          colors: [
            { 'color': '#574444', status: 'unselected' },
            { 'color': '#5B5555', status: 'unselected' },
            { 'color': '#0B2740', status: 'unselected' },
            { 'color': '#464646', status: 'unselected' },
            { 'color': '#787878', status: 'unselected' },
            { 'color': '#322438', status: 'unselected' },
          ]
        },
        {
          title: "Cor Secundária",
          colors: [
            { 'color': '#F3F3F3', status: 'unselected' },
            { 'color': '#F5B1B1', status: 'unselected' },
            { 'color': '#3D05B2', status: 'unselected' },
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


  selectColor(type:any,item: number): void {

    type.colors.forEach((element: { status: string; }) => {
      element.status = 'unselected';
    });
    type.colors[item].status = 'selected';
  }

  selectTheme(item : number): void {
    this.themesList.forEach((element: { status: string; }) => {
      element.status = 'unselected';
    });
    this.themesList[item].status = 'selected';
    console.log(this.themesList[item].status)
  }
}
