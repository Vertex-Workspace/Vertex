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
    this.setUrl();
  }

  setUrl(): void {
    const byteCharacters = atob(this.file.file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    this.url = window.URL.createObjectURL(blob);
  }

  getName(): string {
    const name: string = this.file.name;
    return name.substr(0, name.lastIndexOf('.'));
  }

}
