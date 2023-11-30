import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { QuickAccessComponent } from './quick-access.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [QuickAccessComponent],
  exports: [QuickAccessComponent],
  imports: [
    CommonModule,
    ChartModule,
    RouterModule
  ]
})
export class QuickAccessModule { }
