import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { InputValuePropertyModule } from 'src/app/components/reusable-components/input-value-property/input-value-property.module';
import { TreeSelectModule } from 'primeng/treeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [PropertiesComponent],
  exports: [PropertiesComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule, InputValuePropertyModule, 
    TreeSelectModule, DropdownModule, MultiSelectModule,TranslateModule]
})
export class PropertiesModule { }
