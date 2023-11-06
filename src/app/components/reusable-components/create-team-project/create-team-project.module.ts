import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamProjectComponent } from './create-team-project.component';



@NgModule({
  declarations: [CreateTeamProjectComponent],
  exports: [CreateTeamProjectComponent],
  imports: [
    CommonModule
  ]
})
export class CreateTeamProjectModule { }
