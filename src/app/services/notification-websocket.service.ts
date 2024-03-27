import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/class/message';
import { Chat } from '../models/class/chat';
import { User } from '../models/class/user';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

const backEnd = 'ws://localhost:7777/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationWebSocketService {

  private webSocket: WebSocket;

  private sessionID!: string;


  chatMessages: Message[] = [];

  constructor() {
    this.webSocket = new WebSocket(backEnd);
    this.openWebSocket();
  }

  setIDSession(){

  }

  isTheSameId(){
    
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
        // Extracting the id and uri from the string using regular expressions
        const idRegex = /id=([^,]*)/;
        const uriRegex = /uri=([^,\]]*)/;

        const idMatch = event.data.match(idRegex);
        const uriMatch = event.data.match(uriRegex);

        // Creating a JSON object from the extracted values
        const jsonData = {
            id: idMatch ? idMatch[1] : '',
            uri: uriMatch ? uriMatch[1] : ''
        };

        if(jsonData.id || jsonData.uri){
          //It's not a message
          return;
        }

        console.log(jsonData);
        
        // console.log(`{${event.data}}`, "Data");

        // const obj = JSON.parse(`${event.data}`)

        
        // observer.next(obj);
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