import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CardListModule } from 'src/app/components/reusable-components/card-list/card-list.module';
import { QuickAccessModule } from 'src/app/components/reusable-components/quick-access/quick-access.module';
import { CreateTeamProjectModule } from 'src/app/components/reusable-components/create-team-project/create-team-project.module';
import { ListModule } from '../tasks/list/list.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [HomeComponent],
  exports:[HomeComponent],
  imports: [
    CommonModule,
    CardListModule,
    QuickAccessModule,
    CreateTeamProjectModule,
    ListModule,
    FontAwesomeModule
  ],
})
export class HomeModule { }
