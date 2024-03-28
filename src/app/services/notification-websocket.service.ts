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

      this.webSocket.onopen = (event) => {
        console.log('WebSocket connection established.');
      };

      this.webSocket.onclose = (event) => {
        console.log('WebSocket connection closed.');
      };

      this.webSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Error while opening WebSocket:', error);
    }
  }

  public listenToServer(): Observable<any> {
    return new Observable(observer => {
      this.webSocket.onmessage = (event) => {
        let number : number = event.data;
        console.log(number);
        
        if(number == this.userService.getLogged().id!) {
          console.log(".next()");
          
          observer.next();
        }
      };
    });
  }

  public sendMessage(message: any) {
    if (this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(message));
    }else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  }

  public closeWebSocket() {
    try {
      this.webSocket.close();
    } catch (error) {
      console.error('Error while closing WebSocket:', error);
    }
  }
}