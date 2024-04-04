import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamInformationsComponent } from './team-informations.component';
import { ChartModule } from 'primeng/chart';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardGroupModule } from 'src/app/components/reusable-components/card-group/card-group.module';
import { CreateGroupModule } from 'src/app/components/reusable-components/create-group/create-group.module';
import { CardUserModule } from 'src/app/components/reusable-components/card-user/card-user.module';
import { ConfirmModalModule } from 'src/app/components/modals/confirm-modal/confirm-modal.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [TeamInformationsComponent],
  exports: [TeamInformationsComponent],
  imports: [
    CommonModule,
    ChartModule,
    FontAwesomeModule,
    CardGroupModule,
    CreateGroupModule,
    CardUserModule,
    ConfirmModalModule,
    ProgressBarModule,
    FormsModule
  ]
})
export class TeamInformationsModule { 
}
