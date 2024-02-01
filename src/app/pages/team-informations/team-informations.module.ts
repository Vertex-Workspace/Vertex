import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamInformationsComponent } from './team-informations.component';
import { ChartModule } from 'primeng/chart';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardUserModule } from 'src/app/components/reusable-components/card-user/card-user.module';
import { CardGroupModule } from 'src/app/components/reusable-components/card-group/card-group.module';


@NgModule({
  declarations: [TeamInformationsComponent],
  exports: [TeamInformationsComponent],
  imports: [
    CommonModule,
    ChartModule,
    FontAwesomeModule,
    CardUserModule,
    CardGroupModule
  ]
})
export class TeamInformationsModule { 
}
