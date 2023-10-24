import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamInformationsComponent } from './team-informations.component';
import { ChartModule } from 'primeng/chart';



@NgModule({
  declarations: [TeamInformationsComponent],
  exports: [TeamInformationsComponent],
  imports: [
    CommonModule,
    ChartModule
  ]
})
export class TeamInformationsModule { }
