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

  themesList = [
    {
      mode: 'Tema Claro', 
      icon: faSun,
    },
    {
      mode: 'Tema Escuro', 
      icon: faMoon
    }
  ]

  pcolors = [
      {first: 'pink', status: 'selected'},
      {first: 'purple', status: 'unselected'},
      {first: 'blue' , status: 'unselected'},
      {first: 'green', status: 'unselected'},
      {first: 'white', status: 'unselected'},
      {first: 'black', status: 'unselected'},
  ]

  scolors = [
    {first: 'pink'},
    {first: 'purple'},
    {first: 'blue'},
    {first: 'green'},
    {first: 'white'},
    {first: 'black'},
  ];

  toggles = [
    {text: "Habilitar comando de voz", icon: faToggleOff},
    {text: "Habilitar leitura de texto", icon: faToggleOff},
  ];

  toggleChange(item: number): void{
    if(this.toggles[item].icon == faToggleOn){
      this.toggles[item].icon = faToggleOff;
    }
    else{
      this.toggles[item].icon = faToggleOn;
    }
}


fontSizes = [
  {size: '8', status: 'unselected'},
  {size: '10', status: 'selected'},
  {size: '12', status: 'unselected'},
]

fontFamily = [
  {font: "sla"},
  {font: "sla"},
  {font: "sla"}
];



}
