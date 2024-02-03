import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamInformationsComponent } from './team-informations.component';
import { ChartModule } from 'primeng/chart';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardGroupModule } from 'src/app/components/reusable-components/card-group/card-group.module';
import { CreateGroupModule } from 'src/app/components/reusable-components/create-group/create-group.module';
import { CardUserModule } from 'src/app/components/reusable-components/card-user/card-user.module';


@NgModule({
  declarations: [TeamInformationsComponent],
  exports: [TeamInformationsComponent],
  imports: [
    CommonModule,
    ChartModule,
    FontAwesomeModule,
    CardGroupModule,
    CreateGroupModule,
    CardUserModule

  ]
})
export class TeamInformationsModule { 
}
