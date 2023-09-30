import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from './user-settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    UserSettingsComponent
  ],
  exports: [
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class UserSettingsModule { }
