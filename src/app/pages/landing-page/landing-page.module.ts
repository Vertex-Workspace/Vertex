import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { LandingPageComponent } from './landing-page.component';



@NgModule({
  declarations: [
    LandingPageComponent
  ],
  exports: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    TranslateModule
  ]
})
export class LandingPageModule { }
