import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from './user-settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppearanceComponent } from './appearance/appearance.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TeamsSettingsComponent } from './teams-settings/teams-settings.component';
import { ButtonModule } from 'primeng/button';
import { ProfileModule } from './profile/profile.module';



@NgModule({
  declarations: [
    UserSettingsComponent,
    AppearanceComponent,
    TeamsSettingsComponent,
    NotificationsComponent,
  ],
  exports: [
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule,
    ButtonModule,
    ProfileModule
  ]
})
export class UserSettingsModule { }
