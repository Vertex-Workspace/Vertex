import { Component, NgZone, OnInit } from '@angular/core';
import { faPencil, faSun, faMoon, faToggleOff, faToggleOn, faCheck } from '@fortawesome/free-solid-svg-icons';
import { PersonalizationService } from '../../../services/personalization.service';
import { Personalization } from '../../../models/class/personalization';
import { User } from 'src/app/models/class/user';
import { UserService } from '../../../services/user.service';
import TypedRegistry from 'chart.js/dist/core/core.typedRegistry';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

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

  themes: any = [
    { name: 'light', icon: faSun, value: 0 },
    { name: 'dark', icon: faMoon, value: 1 }
  ]

  fontSizes: number[] = [
    12, 14, 15, 16, 18, 20
  ]

  fontFamily = [
    'Inter', 'Helvetica', 'Arial', 'system-ui', 'Times New Roman'
  ];

  newPers!: Personalization;

  colors = [
    { colorDark: '#176DBF', colorLight: '#092C4C', status: 'unselected' }, // Azul
    { colorDark: '#28a745', colorLight: '#104e29', status: 'unselected' }, // Verde
    { colorDark: '#dc3545', colorLight: '#6e181e', status: 'unselected' }, // Vermelho
    { colorDark: '#17a2b8', colorLight: '#0b4450', status: 'unselected' }, // Azul claro
    { colorDark: '#6f42c1', colorLight: '#341f38', status: 'unselected' }, // Roxo escuro
    { colorDark: '#20c997', colorLight: '#0d5b47', status: 'unselected' }, // Verde claro
    { colorDark: '#C82063', colorLight: '#8e1746', status: 'unselected' }, // Rosa
    { colorDark: '#ff8fff', colorLight: '#ab2d77', status: 'unselected' }, // Rosa claro
    { colorDark: '#007b5e', colorLight: '#003f33', status: 'unselected' }, // Verde azulado
    { colorDark: '#FF6347', colorLight: '#802e1f', status: 'unselected' }, // Tomato
    { colorDark: '#4079C3', colorLight: '#23426a', status: 'unselected' }, // Steel Blue
    { colorDark: '#12846D', colorLight: '#0e6553', status: 'unselected' }, // Light Sea Green
  ];

  constructor(
    private userService: UserService,
    private personalizationService: PersonalizationService,
    private router: Router
  ) {
    this.logged = this.userService.getLogged();
    this.newPers = this.userService.getLogged().personalization!;
  }
  // Sets the theme by default and make the persistence of the theme in this component
  ngOnInit(): void {

    this.colors.forEach((element: any) => {
      if (element.colorLight == this.newPers.primaryColor) {
        element.status = 'selected';
      }
      if (element.colorDark == this.newPers.primaryColor) {
        element.status = 'selected';
      }
    });
  }

  toggleChange(item: any) {
    if (item == 'libras') {
      this.newPers.signLanguage = !this.newPers.signLanguage;
      this.savePersonalization();
      window.location.reload();
    } else if (item == 'listening') {
      this.newPers.listeningText = !this.newPers.listeningText;
      this.savePersonalization();
      window.location.reload();
    } else if (item == 'firstAccess') {

      this.logged.firstAccess = !this.logged.firstAccess;
      this.userService.setFirstAccessNull(this.logged).subscribe((user) => {
        this.router.navigate(['/home']);
      });

    }
  }

  selectColor(color: any) {
    this.colors.forEach((element: any) => {
      element.status = 'unselected';
    });
    color.status = 'selected';
    this.newPers.primaryColor = this.newPers.theme == 0 ? color.colorLight : color.colorDark;
    this.savePersonalization();
  }

  changeTheme(mode: string) {
    this.newPers.theme = mode == "dark" ? 1 : 0;
    if(mode == 'dark'){
      this.newPers.primaryColor = this.colors.find((element : any) => element.status == 'selected')!.colorDark;
    } else {
      this.newPers.primaryColor = this.colors.find((element : any) => element.status == 'selected')!.colorLight;
    }
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
}