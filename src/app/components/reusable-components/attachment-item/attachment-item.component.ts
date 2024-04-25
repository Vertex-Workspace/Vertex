import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultImage } from 'src/assets/data/defaultImg';


@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent {

  @Input()
  file: any;

  @Output()
  removeFile: EventEmitter<any> = new EventEmitter;

  defaultImg = defaultImage;
  url !: string;

  constructor() {
  }

  ngOnInit(): void {
    this.setUrl();
  }

  getIconSrc(): string {
    const fileTypeIcons: Record<string, string> = {
      'application/pdf': 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
      'text/plain': 'https://cdn-icons-png.freepik.com/512/8243/8243060.png',
      'video/mp4': 'https://cdn-icons-png.freepik.com/512/8243/8243015.png',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'https://cdn-icons-png.freepik.com/512/8361/8361467.png',
      'application/vnd.ms-excel': 'https://cdn-icons-png.freepik.com/512/8361/8361467.png',
      'text/csv': 'https://cdn-icons-png.freepik.com/512/8242/8242984.png'
      // adicionar
    };
    const iconSrc = fileTypeIcons[this.file.type];
    if (iconSrc) return iconSrc;
    return `data:image/jpg;base64, ${this.file.file}`;
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

  remove(): void {
    this.removeFile.emit(this.file);
  }

}
