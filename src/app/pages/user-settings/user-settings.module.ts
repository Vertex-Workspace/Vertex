import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from './user-settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppearanceComponent } from './appearance/appearance.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    UserSettingsComponent,
    AppearanceComponent
  ],
  exports: [
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule
  ]
})
export class UserSettingsModule { }
