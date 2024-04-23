import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsComponent } from './colors.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ColorsComponent],
  exports: [ColorsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TranslateModule
  ]
})
export class ColorsModule { }