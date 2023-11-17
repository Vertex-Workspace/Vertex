import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletedComponent } from './deleted.component';


@NgModule({
  declarations: [DeletedComponent],
  exports: [DeletedComponent],
  imports: [
    CommonModule,
  ]
})
export class DeletedModule { }