import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';
import { CardListModule } from 'src/app/components/reusable-components/card-list/card-list.module';



@NgModule({
  declarations: [TeamsComponent],
  exports:[TeamsComponent],
  imports: [
    CommonModule,
    CardListModule
  ],
})
export class TeamsModule { }
