import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPropertiesComponent } from './edit-properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [EditPropertiesComponent],
  exports: [EditPropertiesComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class EditPropertiesModule { }
