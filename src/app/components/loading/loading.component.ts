import { Component, Input } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  constructor(public loadingService :LoadingService) {
    
  }

  @Input()
  userLogged!:boolean;

}
