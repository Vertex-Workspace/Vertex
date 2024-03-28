import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NotificationModule } from '../../modals/notification/notification.module';
import { BadgeModule } from 'primeng/badge';



@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    NotificationModule,
    BadgeModule
  ]
})
export class HeaderModule { }
