import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/class/note';
import { Project } from 'src/app/models/class/project';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

interface Color {
  color: string,
  imgBackgroundColor: string
}

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss']
})
export class NoteModalComponent implements OnInit {

  @Input()
  note !: Note;

  @ViewChild("description") 
  descriptionTextarea !: ElementRef;

  @Output()
  closeModal: EventEmitter<any> = new EventEmitter;

  @Output()
  patchOutput: EventEmitter<void> = new EventEmitter;

  @Output()
  uploadImageOutput: EventEmitter<FormData> = new EventEmitter;

  @Output()
  removeImageOutput: EventEmitter<number> = new EventEmitter;

  textAreaRows !: number;
  hoveringFile !: any;

  faCheck = faCheck;

  project !: Project;

  descriptionEditable: boolean = false;

  colorListOpen: boolean = false;
  
  colorList: Color[] = [
    {
      color: '#77dd77', 
      imgBackgroundColor: ''
    },
    {
      color: '#779ecb', 
      imgBackgroundColor: ''
    },
    {
      color: '#ff7eb9', 
      imgBackgroundColor: ''
    },
    {
      color: '#fff740', 
      imgBackgroundColor: '#fff740'
    },
    {
      color: '#ffffff', 
      imgBackgroundColor: '#fff740'
    },
  ];
  
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    console.log(this.note);
    
  }

  changeColor(color: Color) {    
    this.note.color = color.color;
  }

  toggleColorList(): void {
    this.colorListOpen = !this.colorListOpen;
  }

  toggleEditDescription(): void {
    this.descriptionTextarea.nativeElement.focus();
    this.descriptionEditable = !this.descriptionEditable;
  }

  clickOutHandler(): void {
    this.closeModal.emit();
  }

  getIconSrc(message: any): string {
    if(message.type == "image/png"){
      return `data:image/jpg;base64, ${message.file}`;
    }
    const fileTypeIcons: Record<string, string> = {
      'application/pdf': 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
      'text/plain': 'https://cdn-icons-png.freepik.com/512/8243/8243060.png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'https://cdn-icons-png.freepik.com/256/8361/8361174.png?uid=R112263958&ga=GA1.1.310772085.1710953572&',
      'video/mp4': 'https://cdn-icons-png.freepik.com/512/8243/8243015.png',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'https://cdn-icons-png.freepik.com/512/8361/8361467.png',
      'application/vnd.ms-excel': 'https://cdn-icons-png.freepik.com/512/8361/8361467.png',
      'text/csv': 'https://cdn-icons-png.freepik.com/512/8242/8242984.png'
    };
    return fileTypeIcons[message.type];;
  }

  changeUrlOfArchive(response: any) {
    if (response.file instanceof Blob) {
      response.file = this.convertBlobToFile(response.file, response.name);
      return window.URL.createObjectURL(response.file);
    } else {
      const byteCharacters = atob(response.file);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      return window.URL.createObjectURL(blob);
    }
  }
  convertBlobToFile(blob: Blob, fileName: string): File {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  onFileSelected(e: any): void {
    const selectedFile = e.target.files[0]
    const fd: FormData = new FormData();
    fd.append('file', selectedFile, selectedFile.name);    
    
    this.uploadImageOutput.emit(fd);
  }

  submit(): void {
    this.patchOutput.emit();
    this.closeModal.emit();
  }

  hoverFile(file: any): void {
    this.hoveringFile = file;
  }

  removeImage(file: any): void {
    this.note.files.splice(this.note.files.indexOf(file), 1);
    this.removeImageOutput.emit(file.id);
  }

}
