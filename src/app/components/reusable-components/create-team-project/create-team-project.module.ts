import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamProjectComponent } from './create-team-project.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalWarnModule } from '../../modals/modal-warn/modal-warn.module';
import { ButtonModule } from '../button/button.module';



@NgModule({
  declarations: [CreateTeamProjectComponent],
  exports: [CreateTeamProjectComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ModalWarnModule,
    ButtonModule
  ]
})
export class CreateTeamProjectModule { }