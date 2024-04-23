import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPropertiesComponent } from './edit-properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ItemsSelectionModule } from '../items-selection/items-selection.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [EditPropertiesComponent],
  exports: [EditPropertiesComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ItemsSelectionModule,
    TranslateModule
  ]
})
export class EditPropertiesModule { }
