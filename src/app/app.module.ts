import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { RegisterModule } from './pages/register/register.module';
import { HomeModule } from './pages/home/home.module';
import { InputModule } from './components/reusable-components/input/input.module';
import { CommonModule } from '@angular/common'; // Add this line

import { AppRoutingModule } from './app-routing.module';
import { PersonalizationService } from './services/personalization.service';
import { SidebarModule } from './components/fixed-components/sidebar/sidebar.module';
import { HeaderModule } from './components/fixed-components/header/header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskModule } from './components/modals/task/task.module';
import { UserSettingsModule } from './pages/user-settings/user-settings.module';
import { TeamInformationsModule } from './pages/team-informations/team-informations.module';

import { ChatModule } from './pages/chat/chat.module';
import { NotificationModule } from './components/modals/notification/notification.module';
import { TasksModule } from './pages/tasks/tasks.module';
import { UserInformationsModule } from './pages/user-informations/user-informations/user-informations.module';
import { SearchAllComponent } from './components/modals/search-all/search-all.component';
import { SearchAllModule } from './components/modals/search-all/search-all.module';
import { LoadingComponent } from './components/loading/loading.component';

import { AlertService } from './services/alert.service';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { GroupsSelectModule } from './components/modals/groups-select/groups-select.module';
import { ProjectsModule } from './pages/projects/projects.module';
import { MinichatModule } from './components/modals/minichat/minichat.module';
import { MinichatTASKModule } from './components/modals/minichat-task/minichat-task.module';
import { InputValuePropertyComponent } from './components/reusable-components/input-value-property/input-value-property.component';
import { NoteComponent } from './components/reusable-components/note/note.component';
import { NoteModalComponent } from './components/modals/note-modal/note-modal.component';
import { NoteModalModule } from './components/modals/note-modal/note-modal.module';
import { VlibrasComponent } from './pages/vlibras/vlibras.component';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { JoyrideModule } from 'ngx-joyride';
import { DeniedAccessComponent } from './pages/denied-access/denied-access.component';
import { InvitationPageComponent } from './pages/invitation-page/invitation-page.component';
import { MobileSidebarComponent } from './components/fixed-components/mobile-sidebar/mobile-sidebar.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore, TranslatePipe } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    VlibrasComponent,
    DeniedAccessComponent,
    MobileSidebarComponent
  ],
  imports: [
    JoyrideModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InvitationPageComponent,
    CommonModule,
    LoginModule,
    RegisterModule,
    HomeModule,
    ProjectsModule,
    InputModule,
    ButtonModule,
    AppRoutingModule,
    SidebarModule,
    HeaderModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    TaskModule,
    TasksModule,
    UserSettingsModule,
    TeamInformationsModule,
    ChartModule,
    NotificationModule,
    ChatModule,
    MinichatModule,
    MinichatTASKModule,
    UserInformationsModule,
    SearchAllModule,
    ToastModule,
    GroupsSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    PersonalizationService,
    MessageService,
    AlertService,
    TranslateService,
    TranslateStore,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


