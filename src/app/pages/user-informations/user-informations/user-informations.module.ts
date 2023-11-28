import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserInformationsComponent } from './user-informations.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'primeng/chart';




@NgModule({
  declarations: [UserInformationsComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    ChartModule
  ],
  exports: [
    UserInformationsComponent
  ]
})
export class UserInformationsModule { }
