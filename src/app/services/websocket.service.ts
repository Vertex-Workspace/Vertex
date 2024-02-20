import { Injectable } from '@angular/core';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private webSocket!: WebSocket;
  chatMessages: Chat[] = [];

  constructor() { }

  public openWebSocket() {
    try {
      this.webSocket = new WebSocket('ws://localhost:7777/chat');

      this.webSocket.onopen = (event) => {
        console.log('WebSocket connection established.');
      };

      this.webSocket.onmessage = (event) => {
        const chatMessageDto = JSON.parse(event.data);
        this.chatMessages.push(chatMessageDto);
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

  public sendMessage(chatMessageDto: Chat) {
    try {
      if (this.webSocket.readyState === WebSocket.OPEN) {
        this.webSocket.send(JSON.stringify(chatMessageDto));
      } else {
        console.error('WebSocket is not open. Unable to send message.');
      }
    } catch (error) {
      console.error('Error while sending message over WebSocket:', error);
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
