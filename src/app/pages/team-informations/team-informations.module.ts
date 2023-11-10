import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamInformationsComponent } from './team-informations.component';



@NgModule({
  declarations: [TeamInformationsComponent],
  exports: [TeamInformationsComponent],
  imports: [
    CommonModule
  ]
})
export class TeamInformationsModule { }
