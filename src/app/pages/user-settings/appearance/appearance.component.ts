import { Component, NgZone, OnInit } from '@angular/core';
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
  //Icons
  faPencil = faPencil;
  faSun = faSun;
  faMoon = faMoon;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faCheck = faCheck;

  logged !: User;

  checked!: boolean;
  checked2!: boolean;

  newPers!: Personalization;

  colors: any = [
    { colorLight: '#092C4C', colorDark: '#05141f', status: 'unselected' }, // Azul
    { colorLight: '#28a745', colorDark: '#104e29', status: 'unselected' }, // Verde
    { colorLight: '#dc3545', colorDark: '#6e181e', status: 'unselected' }, // Vermelho
    { colorLight: '#17a2b8', colorDark: '#0b4450', status: 'unselected' }, // Azul claro
    { colorLight: '#6f42c1', colorDark: '#341f38', status: 'unselected' }, // Roxo escuro
    { colorLight: '#20c997', colorDark: '#0d5b47', status: 'unselected' }, // Verde claro
    { colorLight: '#e83e8c', colorDark: '#8e1746', status: 'unselected' }, // Rosa
    { colorLight: '#ff8fff', colorDark: '#ab2d77', status: 'unselected' }, // Rosa claro
    { colorLight: '#007b5e', colorDark: '#003f33', status: 'unselected' }, // Verde azulado
    { colorLight: '#FF6347', colorDark: '#802e1f', status: 'unselected' }, // Tomato
    { colorLight: '#4682B4', colorDark: '#23426a', status: 'unselected' }, // Steel Blue
    { colorLight: '#20B2AA', colorDark: '#0e6553', status: 'unselected' }, // Light Sea Green
    { colorLight: '#8B008B', colorDark: '#460046', status: 'unselected' },
  ];

  constructor(
    private userService: UserService,
    private personalizationService : PersonalizationService
  ) {
  }
  // Sets the theme by default and make the persistence of the theme in this component
  ngOnInit(): void {
    this.logged = this.userService.getLogged();
    this.newPers = this.userService.getLogged().personalization!;
    this.colors.forEach((element : any) => {
      if(element.colorLight == this.newPers.primaryColor){
        element.status = 'selected';
      }
      if(element.colorDark == this.newPers.primaryColor){
        element.status = 'selected';
      }
    });
  }

  toggleChange(item: any){
    if(item == 'libras'){
      this.newPers.signLanguage = !this.newPers.signLanguage;
    } else if(item == 'listening'){
      this.newPers.listeningText = !this.newPers.listeningText;
    }
    this.savePersonalization();
    window.location.reload();      
  }

  fontSizes: number[] = [
    12, 14, 15, 16, 18, 20
  ]

  fontFamily = [
    'Inter', 'Helvetica', 'Arial', 'system-ui', 'Times New Roman'
  ];


  selectColor(color: any) {
    this.colors.forEach((element : any) => {
      element.status = 'unselected';
    }); 
    color.status = 'selected';
    this.newPers.primaryColor = this.newPers.theme == 0 ? color.colorLight : color.colorDark;
    this.savePersonalization();
  }

  changeTheme(mode : string) {
    this.newPers.theme = mode == "dark" ? 1 : 0;
    this.savePersonalization();
  }

  changeFontFamily() {
    this.savePersonalization();
  }
  savePersonalization() {
    this.userService.patchPersonalization(this.newPers).subscribe((userRes) => {
      this.userService.saveLoggedUser(userRes);
      this.personalizationService.setPersonalization(userRes.personalization!);
    });
  }

  changeFontSize() {
    this.userService.patchPersonalization(this.newPers).subscribe((userWithNewPersonalization) => {
      this.userService.saveLoggedUser(userWithNewPersonalization);
      this.personalizationService.setTextVariables(userWithNewPersonalization.personalization!);
    })
  }

  getSelectedOptions(): void {
    this.newPers.fontSize = this.logged.personalization!.fontSize!;
    this.newPers.fontFamily = this.logged.personalization!.fontFamily!;
  }
}