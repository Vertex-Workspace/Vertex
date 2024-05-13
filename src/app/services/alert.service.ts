import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private messageService: MessageService,
    private translateService: TranslateService
  ) { }

  successAlert(message: string): void {
    
    this.messageService.add(
      { 
        severity: 'success', 
        summary: this.translateService.instant('success_alert'), 
        detail: message 
      }
    );
  }

  errorAlert(message: string): void {
    this.messageService.add(
      {
        severity: 'error',
        summary: this.translateService.instant('error_alert'), 
        detail: message
      }
    );
  }

  notificationAlert(message: string): void {
    this.messageService.add(
      {
        severity: 'info',
        summary: this.translateService.instant('notification_alert'), 
        detail: message
      }
    )
  }

}
