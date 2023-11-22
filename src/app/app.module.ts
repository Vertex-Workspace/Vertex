import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { RegisterModule } from './pages/register/register.module';
import { TeamsModule } from './pages/teams/teams.module';
import { ProjectsModule } from './pages/projects/projects.module';
import { InputModule } from './components/reusable-components/input/input.module';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { PersonalizationService } from './services/personalization.service';
import { SidebarModule } from './components/fixed-components/sidebar/sidebar.module';
import { HeaderModule } from './components/fixed-components/header/header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskModule } from './components/modals/task/task.module';
import { UserSettingsModule } from './pages/user-settings/user-settings.module';
import { TeamInformationsModule } from './pages/team-informations/team-informations.module';
import { CommonModule } from '@angular/common';
import { TasksModule } from './pages/tasks/tasks.module';
import { ChartModule } from 'primeng/chart';
import { ChatModule } from './pages/chat/chat.module';
import { MinichatModule } from './pages/miniChat/minichat/minichat.module';
import { NotificationModule } from './components/modals/notification/notification.module';
import { UserInformationsModule } from './pages/user-informations/user-informations/user-informations.module';
import { SearchAllComponent } from './components/modals/search-all/search-all.component';
import { SearchAllModule } from './components/modals/search-all/search-all.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,    
    LoginModule,
    RegisterModule,
    TeamsModule,
    ProjectsModule,
    InputModule,
    ButtonModule,
    AppRoutingModule,
    SidebarModule,
    HeaderModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    TaskModule,
    UserSettingsModule,
    TeamInformationsModule,
    TasksModule,
    UserSettingsModule,
    TeamInformationsModule,
    ChartModule,
    NotificationModule,
    ChatModule,
    MinichatModule,
    UserInformationsModule,
    SearchAllModule
  ],
  providers: [
    PersonalizationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


