import { Component, Input } from '@angular/core';
import { defaultImage } from 'src/assets/data/defaultImg';


@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent {

  @Input()
  file: any;

  defaultImg = defaultImage;
  url !: string;

  constructor() {
  }

  ngOnInit(): void {
    const decodedData = atob(this.file.file);
    const blob = new Blob([decodedData]);
    this.url = URL.createObjectURL(blob); 
  }

  getName(): string {
    const name: string = this.file.name;
    return name.substr(0, name.lastIndexOf('.'));
  }

}
