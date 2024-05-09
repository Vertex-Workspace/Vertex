import { Message } from "./message";


export class Chat {
    id?: number;
    name:String;
    messages?: Message[];
    conversationOpen?: boolean;
    userTeams?: {
        user: {
            id: number;
        },
        team: {
            id: number;
        }
    }[];

    image?: string;

    constructor(chat: Chat) {
        this.name = chat.name;
        this.id = chat.id;
        this.messages = chat.messages;
        this.userTeams = chat.userTeams;
        this.image = chat.image
    }
}