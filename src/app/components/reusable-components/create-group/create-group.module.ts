import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './create-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardUserModule } from '../card-user/card-user.module';



@NgModule({
  declarations: [CreateGroupComponent],
  exports: [CreateGroupComponent],
  imports: [
    CommonModule,
    CardUserModule,
    ReactiveFormsModule,
  ]
})
export class CreateGroupModule { }
