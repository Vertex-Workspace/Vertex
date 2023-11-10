import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { CardListModule } from 'src/app/components/reusable-components/card-list/card-list.module';
import { QuickAccessModule } from 'src/app/components/reusable-components/quick-access/quick-access.module';
import { CreateTeamProjectModule } from 'src/app/components/reusable-components/create-team-project/create-team-project.module';



@NgModule({
  declarations: [ProjectsComponent],
  exports:[ProjectsComponent],
  imports: [
    CommonModule,
    CardListModule,
    QuickAccessModule,
    CreateTeamProjectModule
  ],
})
export class ProjectsModule { }
