import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserInformationsComponent } from './user-informations.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [UserInformationsComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FontAwesomeModule
  ],
  exports: [
    UserInformationsComponent
  ]
})
export class UserInformationsModule { }
