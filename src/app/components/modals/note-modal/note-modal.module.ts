import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteModalComponent } from './note-modal.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextFieldModule } from '@angular/cdk/text-field';




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
    FontAwesomeModule,
    TextFieldModule
  ]
})
export class NoteModalModule { }
