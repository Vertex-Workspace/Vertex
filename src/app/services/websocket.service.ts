import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/class/message';
import { Chat } from '../models/class/chat';
import { User } from '../models/class/user';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { File } from '../models/interface/file';

const backEnd = 'ws://localhost:7777/chat';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private webSocket!: WebSocket;

  chatMessages: Message[] = [];

  constructor() {
    this.openWebSocket();
  }

  //   private clientSocket: Socket;

  //   constructor() { 
  //     this.clientSocket = io(backEnd);
  //   }

  //   listenToServer(connection: string): Observable<any> {
  //     return new Observable(observer => {
  //       this.clientSocket.on(connection, (data: any) => {
  //         console.log(data)
  //         observer.next(data);
  //       });
  //     });
  //   }

  //   sendToServer(connection: string, object:any) {
  //     console.log("Sending message", object, connection);
  //       this.clientSocket.send(connection, object);
  //   }
  // }

  public openWebSocket() {
    try {
      this.webSocket = new WebSocket(backEnd);
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
        // console.log(event, "Event");
        // console.log(chat, "ChatONMESSAGE");

        console.log(`{${event.data}}`, "Data");

        const obj = JSON.parse(`${event.data}`)

        
        observer.next(obj);
      };
    });
  }

  public sendMessage(chatMessageDto: any) {
    if (this.webSocket.readyState === WebSocket.OPEN) {
      console.log("Sending message");
      console.log(chatMessageDto, "MESSAGE");

      this.webSocket.send(JSON.stringify(chatMessageDto));
      console.log(chatMessageDto, "MESSAGE Sent");
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