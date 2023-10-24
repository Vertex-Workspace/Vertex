import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamInformationsComponent } from './team-informations.component';
import { ChartModule } from 'primeng/chart';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [TeamInformationsComponent],
  exports: [TeamInformationsComponent],
  imports: [
    CommonModule,
    ChartModule,
    FontAwesomeModule
  ]
})
export class TeamInformationsModule { 
}
