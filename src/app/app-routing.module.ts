import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MuralComponent } from './pages/mural/mural.component';
import { RegisterComponent } from './pages/register/register.component';

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
