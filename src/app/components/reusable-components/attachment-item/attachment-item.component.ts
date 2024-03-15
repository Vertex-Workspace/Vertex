import { Component } from '@angular/core';
import { defaultImage } from 'src/assets/data/defaultImg';


@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent {

  defaultImg = defaultImage;
  url !: string;

  constructor() {
    var blob = new Blob([defaultImage]);
    this.url = URL.createObjectURL(blob); 
  }

}
