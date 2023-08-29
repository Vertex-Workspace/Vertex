import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { RegisterModule } from './pages/register/register.module';
import { TeamsModule } from './pages/teams/teams.module';
import { ProjectsModule } from './pages/projects/projects.module';
import { MuralModule } from './pages/mural/mural.module';
import { InputModule } from './components/reusable-components/input/input.module';
import { ButtonComponent } from './components/reusable-components/button/button.component';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { PersonalizationService } from './services/personalization.service';

@NgModule({
  declarations: [
    AppComponent
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
    AppRoutingModule
  ],
  providers: [
    PersonalizationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
