import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinichatComponent } from './minichat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { InputModule } from '../../../components/reusable-components/input/input.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/module/pipes.module';



@NgModule({
  declarations: [MinichatComponent],
  exports: [MinichatComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    InputModule,
    TranslateModule,
    PipesModule
  ]
})
export class MinichatModule { }
