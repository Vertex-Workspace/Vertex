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
import { EditPropertiesModule } from './edit-properties/edit-properties.module';
import { GeneralPropertiesModule } from './general-properties/general-properties.module';
import { ItemsSelectionModule } from './items-selection/items-selection.module';
import { ColorsModule } from './colors/colors.module';
import { StatusModule } from './status/status.module';
import { ConfirmModalModule } from '../confirm-modal/confirm-modal.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ModalPropertiesComponent,
  ],
  exports: [
    ModalPropertiesComponent,
  ],
  imports: [
    CommonModule,
    EditPropertiesModule,
    GeneralPropertiesModule,
    StatusModule,
    ItemsSelectionModule,
    FontAwesomeModule,
    ColorsModule,
    DragDropModule,
    ConfirmModalModule,
    TranslateModule
  ]
})
export class ModalPropertiesModule { }
