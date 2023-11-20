import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties.component';
import { EditPropertiesComponent } from './edit-properties/edit-properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StatusComponent } from './status/status.component';
import { ColorsComponent } from './colors/colors.component';
import { GeneralPropertiesComponent } from './general-properties/general-properties.component';



@NgModule({
  declarations: [
    PropertiesComponent,
    EditPropertiesComponent,
    StatusComponent,
    ColorsComponent,
    GeneralPropertiesComponent
  ],
  exports: [
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class PropertiesModule { }
