import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

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
        summary: 'Successo', 
        detail: message 
      }
    );
  }

  errorAlert(message: string) {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'Erro',
        detail: message
      }
    );
  }

}
