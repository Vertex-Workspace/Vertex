import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValuePropertyComponent } from './input-value-property.component';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    InputValuePropertyComponent
  ],
  exports: [InputValuePropertyComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    CascadeSelectModule, 
    CalendarModule,
    InputTextModule,
    InputNumberModule,
    TranslateModule
  ],
})
export class InputValuePropertyModule { }
