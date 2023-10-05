import { Component } from '@angular/core';
import { faCircleUser, faEnvelope, faLock,
        faEarthAmericas, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss']
})
export class AppearanceComponent {
  faCircleUser = faCircleUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEarthAmericas = faEarthAmericas;
  faKey = faKey;

}
