import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SecurityComponent } from './security.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalWarnModule } from 'src/app/components/modals/modal-warn/modal-warn.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';



@NgModule({
  exports:[
    SecurityComponent
  ],
  declarations: [
    SecurityComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FontAwesomeModule,
    ModalWarnModule,
    ReactiveFormsModule
  ],
  providers: [
    AlertService
  ]
})
export class SecurityModule { }