import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './components/modals/task/task.component';
import { LoginComponent } from './pages/login/login.component';
import { MuralComponent } from './pages/mural/mural.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'loginPage' }
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
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'userProfile',
    component: UserSettingsComponent
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
