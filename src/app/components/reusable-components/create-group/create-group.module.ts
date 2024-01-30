import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './create-group.component';
import { CardUserModule } from '../card-user/card-user.module';



@NgModule({
  declarations: [CreateGroupComponent],
  exports: [CreateGroupComponent],
  imports: [
    CommonModule,
    CardUserModule
  ]
})
export class CreateGroupModule { }
