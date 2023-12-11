import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './components/modals/task/task.component';
import { LoginComponent } from './pages/login/login.component';
import { MuralComponent } from './pages/tasks/mural/mural.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RegisterComponent } from './pages/register/register.component';
import { TeamInformationsComponent } from './pages/team-informations/team-informations.component';
import { HomeComponent } from './pages/home/home.component';
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
import { AuthGuard } from './services/guards/auth.guard';
import { UserTeamGuard } from './services/guards/user-team.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'loginPage' }
  },
  {
    path: 'cadastro',
    component: RegisterComponent,
    data: { animation: 'registerPage' }
  },
  {
    path: "equipe",
    component: TeamInformationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "equipe/:id",
    component: TeamInformationsComponent,
    canActivate: [AuthGuard, UserTeamGuard] //add verificação de 
  },
  {
    path: "perfil",
    component: UserInformationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "projetos",
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "equipe/:id/projetos",
    component: ProjectsComponent,
    canActivate: [AuthGuard, UserTeamGuard]
  },
  {
    path: 'tarefas',
    component: TasksComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'kanban',
        component: KanbanComponent
      },
      {
        path: 'lista',
        component: ListComponent
      },
      {
        path: 'calendario',
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
    canActivate: [AuthGuard],
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
