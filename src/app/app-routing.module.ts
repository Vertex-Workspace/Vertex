import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MuralComponent } from './pages/mural/mural.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'mural',
    component: MuralComponent
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
