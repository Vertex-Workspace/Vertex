import { AfterViewInit, 
         Component, 
         ElementRef, 
         Input, 
         OnInit, 
         QueryList, 
         ViewChildren } from '@angular/core';
import { Task } from 'src/app/models/class/task';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { Note } from 'src/app/models/class/note';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/class/project';
import { NoteService } from 'src/app/services/note.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss']
})
export class MuralComponent implements OnInit {

  @Input()
  project!: Project;

  @Input()
  nameFilter !: string;

  notes !: Note[];

  constructor(
    private noteService: NoteService
  ){ }

  getNotes(): void {
    this.notes = this.project.notes;    
  }

  ngOnInit(): void {  
    this.getNotes();   
  }

  deleteNote(note: Note) {    
    this.noteService
      .delete(note.id!)
      .subscribe();

    this.project.notes.splice(this.project.notes.indexOf(note), 1);
  }

}
