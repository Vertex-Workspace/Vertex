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
      color: '#D3E5EF',
      imgBackgroundColor: '#c5dfed'
    },
    {
      color: '#FF9D9D',
      imgBackgroundColor: '#ff8787'
    },
    {
      color: '#F5E0E9',
      imgBackgroundColor: '#f5d5e3'
    },
    {
      color: '#FFD601',
      imgBackgroundColor: 'deba00'
    },
    {
      color: '#E3E2E0',
      imgBackgroundColor: '#c2c2c0'
    },
    {
      color: '#65D73C',
      imgBackgroundColor: '#58cf2d'
    },
    {
      color: '#FFFFFF',
      imgBackgroundColor: '#F3F3F3'
    }
  ];
  
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      if (params) {
        console.log(params);
        this.getProject(params['id']);        
      }
    });
    
    this.descriptionTextarea.nativeElement.focus();
  }

  getProject(id: number): void {
    console.log(this.userService.getLogged().id!);
    
    this.projectService
      .getOneById(id, this.userService.getLogged().id!)
      .subscribe((project: Project) => {
        console.log(project);
        
        
        
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
    this.descriptionTextarea.nativeElement.focus();
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

  hoverFile(file: any): void {
    this.hoveringFile = file;
  }

  removeImage(file: any): void {
    this.note.files.splice(this.note.files.indexOf(file), 1);
    this.removeImageOutput.emit(file.id);
  }

}
