import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchAllModule } from '../../modals/search-all/search-all.module';
import { RouterModule } from '@angular/router';
import { ModalWarnModule } from '../../modals/modal-warn/modal-warn.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SearchAllModule,
    RouterModule,
    ModalWarnModule,
    TranslateModule
  ]
})
export class SidebarModule { }
