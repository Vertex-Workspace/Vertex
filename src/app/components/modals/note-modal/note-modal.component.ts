import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Note } from 'src/app/models/class/note';
import { Project } from 'src/app/models/class/project';
import { ProjectService } from 'src/app/services/project.service';

interface Color {
  color: string,
  selected: boolean
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

  textAreaRows !: number;

  faCheck = faCheck;

  project !: Project;

  descriptionEditable: boolean = false;

  colorListOpen: boolean = false;
  colorList: Color[] = [
    {
      color: '#D3E5EF',
      selected: false,
    },
    {
      color: '#FF9D9D',
      selected: false,
    },
    {
      color: '#F5E0E9',
      selected: false,
    },
    {
      color: '#FFD601',
      selected: false,
    },
    {
      color: '#E3E2E0',
      selected: false,
    },
    {
      color: '#65D73C',
      selected: false,
    },
    {
      color: '#FFFFFF',
      selected: false,
    }
  ];
  
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
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

  getSelectedColor(): any {
    return this.colorList.find(c => {      
      return c.selected;
    });
  };

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

}
