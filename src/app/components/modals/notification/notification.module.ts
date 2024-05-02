import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/module/pipes.module';



@NgModule({
  declarations: [
    NotificationComponent
  ],
  exports: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule,
    PipesModule,
    TranslateModule
  ]
})
export class NotificationModule { }
