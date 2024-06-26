import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamProjectComponent } from './create-team-project.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalWarnModule } from '../../modals/modal-warn/modal-warn.module';
import { ButtonModule } from '../button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardUserModule } from '../card-user/card-user.module';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';
import { TreeSelectModule } from 'primeng/treeselect';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [CreateTeamProjectComponent],
  exports: [CreateTeamProjectComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ModalWarnModule,
    ButtonModule,
    ReactiveFormsModule,
    CardUserModule,
    TreeSelectModule,
    DropdownModule,
    MultiSelectModule,
    TranslateModule
  ]
})
export class CreateTeamProjectModule { }
