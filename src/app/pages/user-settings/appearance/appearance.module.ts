import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppearanceComponent } from './appearance.component';



@NgModule({
  declarations: [
    AppearanceComponent
  ],
  exports: [
    AppearanceComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule
  ]
})
export class UserSettingsModule { }