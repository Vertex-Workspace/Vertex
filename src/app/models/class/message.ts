import { Chat } from "./chat";
import { User } from "./user";

export class Message {
    id?: number;
    user?: string;
    chat?: Chat;
    contentMessage?: String;
    time?: String;
    viewed?: boolean;
    file?: String;

    constructor(message: Message) {
        this.id = message.id;
        this.user = message.user;
        this.chat = message.chat;
        this.file = message.file;
        this.contentMessage = message.contentMessage;
        this.time = message.time;
        this.viewed = message.viewed;
    }



}