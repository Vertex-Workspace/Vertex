import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsSettingsComponent } from './teams-settings.component';
import { CardListModule } from 'src/app/components/reusable-components/card-list/card-list.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    TeamsSettingsComponent
  ],
  exports: [
    TeamsSettingsComponent
  ],
  imports: [
    CommonModule,
    CardListModule,
    FontAwesomeModule
  ]
})
export class TeamsSettingsModule { }