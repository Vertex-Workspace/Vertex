import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CardListModule } from 'src/app/components/reusable-components/card-list/card-list.module';
import { QuickAccessModule } from 'src/app/components/reusable-components/quick-access/quick-access.module';
import { CreateTeamProjectModule } from 'src/app/components/reusable-components/create-team-project/create-team-project.module';
import { ListModule } from '../tasks/list/list.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskModule } from 'src/app/components/modals/task/task.module';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { JoyrideModule, JoyrideStepComponent } from 'ngx-joyride';


@NgModule({
  declarations: [HomeComponent],
  exports:[HomeComponent],
  imports: [
    CommonModule,
    JoyrideModule,
    CardListModule,
    QuickAccessModule,
    CreateTeamProjectModule,
    ListModule,
    FontAwesomeModule,
    TaskModule,
    FormsModule,
    CascadeSelectModule,
    CalendarModule,
    InputTextModule
  ],
})
export class HomeModule { }
