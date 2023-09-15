import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { RegisterModule } from './pages/register/register.module';
import { TeamsModule } from './pages/teams/teams.module';
import { ProjectsModule } from './pages/projects/projects.module';
import { MuralModule } from './pages/mural/mural.module';
import { InputModule } from './components/reusable-components/input/input.module';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { PersonalizationService } from './services/personalization.service';
import { SidebarModule } from './components/fixed-components/sidebar/sidebar.module';
import { HeaderComponent } from './components/fixed-components/header/header.component';
import { HeaderModule } from './components/fixed-components/header/header.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    RegisterModule,
    TeamsModule,
    ProjectsModule,
    MuralModule,
    InputModule,
    ButtonModule,
    AppRoutingModule,
    SidebarModule,
    HeaderModule
  ],
  providers: [
    PersonalizationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
