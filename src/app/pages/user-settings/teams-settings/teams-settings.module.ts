import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsSettingsComponent } from './teams-settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardListModule } from 'src/app/components/reusable-components/card-list/card-list.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/module/pipes.module';
import { FormsModule } from '@angular/forms';




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
    FontAwesomeModule,
    TranslateModule,
    FormsModule,
    PipesModule
  ]
})
export class TeamsSettingsModule { }