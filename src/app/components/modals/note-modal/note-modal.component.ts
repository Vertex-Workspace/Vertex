import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/class/note';
import { Project } from 'src/app/models/class/project';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';

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

  @Output()
  closeModal: EventEmitter<any> = new EventEmitter;

  @Output()
  patchOutput: EventEmitter<void> = new EventEmitter;

  @Output()
  uploadImageOutput: EventEmitter<FormData> = new EventEmitter;

  @Output()
  removeImageOutput: EventEmitter<number> = new EventEmitter;

  textAreaRows !: number;

  faCheck = faCheck;

  project !: Project;

  descriptionEditable: boolean = false;

  colorListOpen: boolean = false;
  colorList: Color[] = [
    {
      color: '#D3E5EF',
      imgBackgroundColor: ''
    },
    {
      color: '#FF9D9D',
      imgBackgroundColor: ''
    },
    {
      color: '#F5E0E9',
      imgBackgroundColor: ''
    },
    {
      color: '#FFD601',
      imgBackgroundColor: ''
    },
    {
      color: '#E3E2E0',
      imgBackgroundColor: ''
    },
    {
      color: '#65D73C',
      imgBackgroundColor: ''
    },
    {
      color: '#FFFFFF',
      imgBackgroundColor: '#F3F3F3'
    }
  ];
  
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {
    route.params.subscribe(params => {
      if (params) {
        this.getProject(params['id']);        
      }
    });
  }

  ngOnInit(): void {
  }

  getProject(id: number): void {
    this.projectService
      .getOneById(id)
      .subscribe((project: Project) => {
        this.project = project;
      })
  }

  changeColor(color: Color) {    
    this.note.color = color.color;
  }

  toggleColorList(): void {
    this.colorListOpen = !this.colorListOpen;
  }

  toggleEditDescription(): void {
    this.descriptionEditable = !this.descriptionEditable;
  }

  clickOutHandler(): void {
    this.closeModal.emit();
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

  removeImage(file: any): void {
    this.note.files.splice(this.note.files.indexOf(file), 1);
    this.removeImageOutput.emit(file.id);
  }

}
