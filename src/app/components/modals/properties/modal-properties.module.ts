import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPropertiesComponent } from './modal-properties.component';
import { EditPropertiesComponent } from './edit-properties/edit-properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StatusComponent } from './status/status.component';
import { ColorsComponent } from './colors/colors.component';
import { GeneralPropertiesComponent } from './general-properties/general-properties.component';
import { ItemsSelectionComponent } from './items-selection/items-selection.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    ModalPropertiesComponent,
    EditPropertiesComponent,
    StatusComponent,
    ColorsComponent,
    GeneralPropertiesComponent,
    ItemsSelectionComponent
  ],
  exports: [
    ModalPropertiesComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DragDropModule
  ]
})
export class PropertiesModule { }
