import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteModalComponent } from './note-modal.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    NoteModalComponent
  ],
  exports: [
    NoteModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class NoteModalModule { }
