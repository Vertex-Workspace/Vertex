import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';
import { NoteModalModule } from '../../modals/note-modal/note-modal.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    NoteComponent
  ],
  exports: [
    NoteComponent
  ],
  imports: [
    CommonModule,
    NoteModalModule,
    DragDropModule,
    TranslateModule
  ]
})
export class NoteModule { }
