import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { ColorsComponent } from '../colors/colors.component';
import { ColorsModule } from '../colors/colors.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [StatusComponent],
  exports: [StatusComponent],
  imports: [
    CommonModule,
    ColorsModule,
    FontAwesomeModule,
    DragDropModule
  ]
})
export class StatusModule { }