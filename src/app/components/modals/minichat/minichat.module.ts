import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinichatComponent } from './minichat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { InputModule } from '../../../components/reusable-components/input/input.module';
// import { PickerModule } from '@ctrl/ngx-emoji-mart';



@NgModule({
  declarations: [MinichatComponent],
  exports: [MinichatComponent],
  imports: [
    CommonModule,
    // PickerModule,
    FontAwesomeModule,
    FormsModule,
    InputModule,
    PickerModule
  ]
})
export class MinichatModule { }
