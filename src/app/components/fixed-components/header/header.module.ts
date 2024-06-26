import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NotificationModule } from '../../modals/notification/notification.module';
import { BadgeModule } from 'primeng/badge';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    NotificationModule,
    CascadeSelectModule,
    FormsModule,
    BadgeModule,
    MatMenuModule,
    TranslateModule
  ]
})
export class HeaderModule { }
