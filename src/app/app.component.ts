import { Component } from '@angular/core';
import { PersonalizationService } from './services/personalization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Vertex';
  constructor(private personalization : PersonalizationService){
    personalization.setPersonalization();
  }
}
