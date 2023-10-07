import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProfileComponent } from './profile.component';



@NgModule({
  exports:[
    ProfileComponent
  ],
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class ProfileModule { }
