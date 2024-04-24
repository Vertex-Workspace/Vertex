import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { InputModule } from '../../../components/reusable-components/input/input.module';
import { MinichatTASKComponent } from './minichat-task.component';

@NgModule({
  declarations: [MinichatTASKComponent],
  exports: [MinichatTASKComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    InputModule,
  ]
})
export class MinichatTASKModule { }
