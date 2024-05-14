import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private messageService: MessageService
  ) { }

  successAlert(message: string): void {
    
    this.messageService.add(
      { 
        severity: 'success', 
        summary: 'Sucesso', 
        detail: message 
      }
    );
  }

  errorAlert(message: string): void {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'Erro',
        detail: message
      }
    );
  }

  notificationAlert(message: string): void {
    this.messageService.add(
      {
        severity: 'info',
        summary: 'Notificação',
        detail: message
      }
    )
  }

}
