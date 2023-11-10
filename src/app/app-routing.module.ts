import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './components/modals/task/task.component';
import { LoginComponent } from './pages/login/login.component';
import { MuralComponent } from './pages/mural/mural.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RegisterComponent } from './pages/register/register.component';
import { TeamInformationsComponent } from './pages/team-informations/team-informations.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { AppearanceComponent } from './pages/user-settings/appearance/appearance.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { ProfileComponent } from './pages/user-settings/profile/profile.component';
import { NotificationsComponent } from './pages/user-settings/notifications/notifications.component';
import { TeamsSettingsComponent } from './pages/user-settings/teams-settings/teams-settings.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'loginPage' }
  },
  {
    path: "home",
    component: TeamsComponent
  },
  {
    path: "project",
    component: ProjectsComponent
  },  
  {
    path: 'mural',
    component: MuralComponent,
    data: { animation: 'muralPage' }
  },
  {
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'configuracoes',
    component: UserSettingsComponent,
    children:[
      {
      path: 'aparencia',
      component: AppearanceComponent
      },
      {
      path: 'perfil',
      component: ProfileComponent
      },
      {
      path: 'equipes',
      component: TeamsSettingsComponent
      },
      {
      path: 'notificacoes',
      component: NotificationsComponent
      },
      
      {
      path: "",
      pathMatch: "full",
      redirectTo: "perfil",
      },
    ]
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
  {
    path: "**",
    redirectTo: "login",
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})


export class AppRoutingModule { }
