import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamProjectComponent } from './create-team-project.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalWarnModule } from '../../modals/modal-warn/modal-warn.module';
import { ButtonModule } from '../button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardUserModule } from '../card-user/card-user.module';



@NgModule({
  declarations: [CreateTeamProjectComponent],
  exports: [CreateTeamProjectComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ModalWarnModule,
    ButtonModule,
    ReactiveFormsModule,
    CardUserModule
  ]
})
export class CreateTeamProjectModule { }
