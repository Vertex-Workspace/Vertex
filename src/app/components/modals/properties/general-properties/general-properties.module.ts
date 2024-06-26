import { EventEmitter, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralPropertiesComponent } from './general-properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ConfirmModalModule } from '../../confirm-modal/confirm-modal.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [GeneralPropertiesComponent],
  exports: [GeneralPropertiesComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DragDropModule,
    ConfirmModalModule,
    TranslateModule
  ]
})
export class GeneralPropertiesModule { 

}