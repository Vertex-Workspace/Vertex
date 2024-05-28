import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
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

  @Input()
  realFile!:File;
  url !: string;

  constructor(public userService: UserService, private alert: AlertService,private router: Router,private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.setUrl();
  }

  callServiceDrive() {
   if(this.userService.getLogged().syncWithDrive){
    const byteCharacters = atob(this.file.file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: this.file.type });
  
    const fd: FormData = new FormData();
    fd.append('file', blob, this.file.name);
  
    this.userService.sendItensToDrive(fd).subscribe(
      (res) => {
        console.log('File ID:', res);
        this.alert.successAlert(this.translate.instant('fileUploadedToDrive'));
      },
      (error) => {
        this.alert.errorAlert(this.translate.instant('fileErorUploadedToDrive'));
        console.error('Upload error:', error);
      }
    );
   }else{
      this.alert.notificationAlert(this.translate.instant('areNotSyncDrive'));
   }
  }
  

  getIconSrc(): string {
    const fileTypeIcons: Record<string, string> = {
      'application/pdf': 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
      'text/plain': 'https://cdn-icons-png.freepik.com/512/8243/8243060.png',
      'video/mp4': 'https://cdn-icons-png.freepik.com/512/8243/8243015.png',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'https://cdn-icons-png.freepik.com/512/8361/8361467.png',
      'application/vnd.ms-excel': 'https://cdn-icons-png.freepik.com/512/8361/8361467.png',
      'text/csv': 'https://cdn-icons-png.freepik.com/512/8242/8242984.png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'https://cdn-icons-png.freepik.com/256/8361/8361174.png?uid=R112263958&ga=GA1.1.310772085.1710953572&',
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
    const blob = new Blob([byteArray], { type: this.file.type });
  
    this.url = window.URL.createObjectURL(blob);
  }
  

  getName(): string {
    const name: string = this.file.name;
    
    
    return name;
  }

  remove(): void {
    this.removeFile.emit(this.file);
  }

}
