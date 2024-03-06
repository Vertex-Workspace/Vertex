import { Chat } from "./chat";
import { User } from "./user";

export class Message {
    id?: number;
    user: User;
    chat?: Chat;
    contentMessage?: String;
    time?: String;
    viewed?: boolean;

    constructor(message: Message) {
        this.id = message.id;
        this.user = message.user;
        this.chat = message.chat;
        this.contentMessage = message.contentMessage;
        this.time = message.time;
        this.viewed = message.viewed;
    }
}