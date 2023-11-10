import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './components/modals/task/task.component';
import { LoginComponent } from './pages/login/login.component';
import { MuralComponent } from './pages/mural/mural.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RegisterComponent } from './pages/register/register.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { KanbanComponent } from './pages/tasks/kanban/kanban.component';
import { ListComponent } from './pages/tasks/list/list.component';
import { CalendarComponent } from './pages/tasks/calendar/calendar.component';
import { TeamInformationsComponent } from './pages/team-informations/team-informations.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { AppearanceComponent } from './pages/user-settings/appearance/appearance.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';

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
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'registerPage' }
  },
  {
    path: 'tasks',
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
      // {
      // path: "",
      // pathMatch: "full",
      // redirectTo: "aparencia",
      // },
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
