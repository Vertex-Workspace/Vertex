import { Chat } from "./chat";
import { User } from "./user";

export class Message {
    id?: number;
    user?: string;
    chat?: Chat;
    contentMessage?: String;
    time?: Date;
    viewed?: boolean;
    file?: String;
    imageUser?:String

    constructor(message: Message) {
        this.id = message.id;
        this.user = message.user;
        this.chat = message.chat;
        this.file = message.file;
        this.imageUser = this.imageUser;
        this.contentMessage = message.contentMessage;
        this.time = message.time;
        this.viewed = message.viewed;
    }




}