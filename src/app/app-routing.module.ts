import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './components/modals/task/task.component';
import { LoginComponent } from './pages/login/login.component';
import { MuralComponent } from './pages/tasks/mural/mural.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RegisterComponent } from './pages/register/register.component';
import { TeamInformationsComponent } from './pages/team-informations/team-informations.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { AppearanceComponent } from './pages/user-settings/appearance/appearance.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { ProfileComponent } from './pages/user-settings/profile/profile.component';
import { NotificationsComponent } from './pages/user-settings/notifications/notifications.component';
import { TeamsSettingsComponent } from './pages/user-settings/teams-settings/teams-settings.component';
import { SecurityComponent } from './pages/user-settings/security/security.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { KanbanComponent } from './pages/tasks/kanban/kanban.component';
import { ListComponent } from './pages/tasks/list/list.component';
import { CalendarComponent } from './pages/tasks/calendar/calendar.component';
import { UserInformationsComponent } from './pages/user-informations/user-informations/user-informations.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'loginPage' }
  },
  {
    path: "equipe",
    component: TeamInformationsComponent
  },
  {
    path: "perfil",
    component: UserInformationsComponent
  },
  {
    path: "home",
    component: TeamsComponent
  },
  {
    path: "projetos",
    component: ProjectsComponent
  },
  {
    path: 'cadastro',
    component: RegisterComponent,
    data: { animation: 'registerPage' }
  },
  {
    path: 'tarefas',
    component: TasksComponent,
    children: [
      {
        path: 'kanban',
        component: KanbanComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'mural',
        component: MuralComponent
      }
    ],
  },
  {
    path: 'configuracoes',
    component: UserSettingsComponent,
    children: [
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
        path: 'seguranca',
        component: SecurityComponent
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
