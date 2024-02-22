import { AfterViewInit, 
         Component, 
         ElementRef, 
         OnInit, 
         QueryList, 
         ViewChildren } from '@angular/core';
import { Task } from 'src/app/models/task';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { taskList } from '../data-test';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss']
})
export class MuralComponent implements OnInit, AfterViewInit {

  defaultNotes: Note[] = [
    {
      id: 1,
      title: 'Note 1',
      description: 'Description 1',
      width: 200,
      height: 200,
      color: '"#65D73C',
      positionX: 0,
      positionY: 0
    },
    {
      id: 2,
      title: 'Note 2',
      description: 'Description 2',
      width: 200,
      height: 200,
      color: '#FFD600',
      positionX: 0,
      positionY: 0
    },
    {
      id: 3,
      title: 'Note 3',
      description: 'Description 3',
      width: 200,
      height: 200,
      color: '#FF9D9D',
      positionX: 0,
      positionY: 0
    }
  ]

  constructor(
    private personalization : PersonalizationService
  ){}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
