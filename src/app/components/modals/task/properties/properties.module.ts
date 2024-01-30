import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties.component';
import { InputValuePropertyComponent } from 'src/app/components/reusable-components/input-value-property/input-value-property.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { InputValuePropertyModule } from 'src/app/components/reusable-components/input-value-property/input-value-property.module';



@NgModule({
  declarations: [PropertiesComponent],
  exports: [PropertiesComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule, InputValuePropertyModule]
})
export class PropertiesModule { }
