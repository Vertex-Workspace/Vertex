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
import { SecurityModule } from './security/security.module';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TranslateModule } from '@ngx-translate/core';
import { AdminComponent } from './admin/admin/admin.component';
import { ChartModule } from 'primeng/chart';



@NgModule({
  declarations: [
    UserSettingsComponent,
    AppearanceComponent,
    NotificationsComponent,
    AdminComponent,
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
    TeamsSettingsModule,
    SecurityModule,
    FormsModule,
    ChartModule,
    CascadeSelectModule,
    InputSwitchModule,
    TranslateModule
  ]
})
export class UserSettingsModule { }
