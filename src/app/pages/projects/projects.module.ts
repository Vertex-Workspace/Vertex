import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { CardListModule } from 'src/app/components/reusable-components/card-list/card-list.module';
import { QuickAccessModule } from 'src/app/components/reusable-components/quick-access/quick-access.module';
import { CreateTeamProjectModule } from 'src/app/components/reusable-components/create-team-project/create-team-project.module';
import { ListModule } from '../tasks/list/list.module';
import { CardGroupModule } from 'src/app/components/reusable-components/card-group/card-group.module';
import { CreateGroupModule } from 'src/app/components/reusable-components/create-group/create-group.module';


@NgModule({
  declarations: [ProjectsComponent],
  exports:[ProjectsComponent],
  imports: [
    CommonModule,
    CardListModule,
    QuickAccessModule,
    CreateTeamProjectModule,
    ListModule,
    CardGroupModule,
    CreateGroupModule
  ],
})
export class ProjectsModule { }
