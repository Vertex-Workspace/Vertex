import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPropertiesComponent } from './edit-properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [EditPropertiesComponent],
  exports: [EditPropertiesComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class EditPropertiesModule { }
