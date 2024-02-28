import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Note, NoteGet } from 'src/app/models/note';
import { Project } from 'src/app/models/project';
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
  note !: NoteGet;

  @Output()
  closeModal: EventEmitter<any> = new EventEmitter;

  faCheck = faCheck;

  project !: Project;

  descriptionEditable: boolean = false;

  colorListOpen: boolean = false;
  colorList: Color[] = [
    {
      color: 'BLUE',
      selected: false,
    },
    {
      color: '#FF9D9D50',
      selected: false,
    },
    {
      color: 'PINK',
      selected: false,
    },
    {
      color: 'ORANGE',
      selected: false,
    },
    {
      color: 'GREY',
      selected: false,
    },
    {
      color: '#FFD60050',
      selected: false,
    },
    {
      color: 'BROWN',
      selected: false,
    },
    {
      color: '#65D73C50',
      selected: false,
    },
    {
      color: '#FFFFFF',
      selected: true,
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
    console.log(this.note);
    
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
    this.colorList.forEach(c => {
      if (c === color) c.selected = true;
      else c.selected = false;
    });    
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

}
