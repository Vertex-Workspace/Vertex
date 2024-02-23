import { AfterViewInit, 
         Component, 
         ElementRef, 
         Input, 
         OnInit, 
         QueryList, 
         ViewChildren } from '@angular/core';
import { Task } from 'src/app/models/task';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { taskList } from '../data-test';
import { Note } from 'src/app/models/note';
import { Project } from 'src/app/models/project';
import { NoteService } from 'src/app/services/note.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss']
})
export class MuralComponent implements OnInit {

  @Input()
  project!: Project;

  notes !: Note[];

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute
  ){
    route.params.subscribe(params => {
      if (params) {
        this.getNotes(params['id']);           
      }
    });
  }

  teste(e: any): void {
    console.log(e);
    
  }

  getNotes(id: number): void {
    this.noteService
    .getAllByProject(id)
    .subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  ngOnInit(): void {}

}
