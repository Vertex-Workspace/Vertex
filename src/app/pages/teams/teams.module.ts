import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';



@NgModule({
  declarations: [TeamsComponent],
  exports:[TeamsComponent],
  imports: [
    CommonModule
  ],
})
export class TeamsModule { }
