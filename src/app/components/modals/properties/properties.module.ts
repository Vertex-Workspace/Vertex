import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties.component';
import { EditPropertiesComponent } from './edit-properties/edit-properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StatusComponent } from './status/status.component';
import { ColorsComponent } from './colors/colors.component';
import { GeneralPropertiesComponent } from './general-properties/general-properties.component';
import { ItemsSelectionComponent } from './items-selection/items-selection.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    PropertiesComponent,
    EditPropertiesComponent,
    StatusComponent,
    ColorsComponent,
    GeneralPropertiesComponent,
    ItemsSelectionComponent
  ],
  exports: [
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DragDropModule
  ]
})
export class PropertiesModule { }
