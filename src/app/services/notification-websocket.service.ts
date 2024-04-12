import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/class/message';
import { Chat } from '../models/class/chat';
import { User } from '../models/class/user';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { UserService } from './user.service';

const backEnd = 'ws://localhost:7777/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationWebSocketService {

  private webSocket: WebSocket;


  constructor(private userService : UserService) {
    this.webSocket = new WebSocket(backEnd);
    this.openWebSocket();
  }



  public openWebSocket() {
    try {

      this.webSocket.onopen = (event) => {};

      this.webSocket.onclose = (event) => {};

      this.webSocket.onerror = (error) => {};
    } catch (error) {}
  }

  public listenToServer(): Observable<any> {
    return new Observable(observer => {
      this.webSocket.onmessage = (event) => {
        let number : number = event.data;

        if(number == this.userService.getLogged().id!) {
          observer.next();
        }
      };
    });
  }

  public sendMessage(message: any) {
    if (this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(message));
    }
  }

  public closeWebSocket() {
    try {
      this.webSocket.close();
    } catch (error) {}
  }
}