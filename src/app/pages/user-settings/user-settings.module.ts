import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from './user-settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppearanceComponent } from './appearance/appearance.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { ButtonModule } from 'primeng/button';
import { ProfileModule } from './profile/profile.module';
import { TeamsSettingsModule } from './teams-settings/teams-settings.module';
import { SecurityComponent } from './security/security.component';



@NgModule({
  declarations: [
    UserSettingsComponent,
    AppearanceComponent,
    NotificationsComponent,
    SecurityComponent
  ],
  exports: [
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule,
    ButtonModule,
    ProfileModule,
    TeamsSettingsModule
  ]
})
export class UserSettingsModule { }
