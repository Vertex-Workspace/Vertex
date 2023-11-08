import { Component } from '@angular/core';
import { faPencil, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss']
})
export class AppearanceComponent {
  faPencil = faPencil;
  faSun = faSun;
  faMoon = faMoon;

  themesList = [
    {
      mode: 'light', 
      icon: faSun,
      colors: {
        
      }
    },
    {mode: 'dark', icon: faMoon}
  ]


}
