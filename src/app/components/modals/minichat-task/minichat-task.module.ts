import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { InputModule } from '../../../components/reusable-components/input/input.module';
import { MinichatTASKComponent } from './minichat-task.component';
import { TranslateModule } from '@ngx-translate/core';
// import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [MinichatTASKComponent],
  exports: [MinichatTASKComponent],
  imports: [
    CommonModule,
    // PickerModule,
    TranslateModule,
    FontAwesomeModule,
    FormsModule,
    InputModule,
  ]
})
export class MinichatTASKModule { }
