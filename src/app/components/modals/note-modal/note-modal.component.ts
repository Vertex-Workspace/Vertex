import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Note, NoteGet } from 'src/app/models/note';
import { Project } from 'src/app/models/project';

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

  ngOnInit(): void {

  }

  getSelectedColor(): any {
    return this.colorList.find(c => {      
      return c.selected;
    });
  };

  changeColor(color: Color) {
    console.log(color);
    
    this.note.color = color.color;
    this.colorList.forEach(c => {
      if (c === color) c.selected = true;
      else c.selected = false;
    });
    console.log(this.colorList);
    
  }

  toggleColorList(): void {
    this.colorListOpen = !this.colorListOpen;
  }

  toggleEditDescription(): void {
    this.descriptionEditable = !this.descriptionEditable;
  }

}
