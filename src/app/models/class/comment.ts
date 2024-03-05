import { Task } from "./task";
import { TaskResponsable } from "./taskResponsable";
import { User } from "./user";

export class Comment {

    id?: number;
    comment ?: string;
    date?: Date;
    //ID
    taskResponsable?: TaskResponsable;
}

export class CommentSend {
    id?: number;
    comment ?: string;
    date?: Date;
    //ID
    taskResponsableID?: number;
    taskID?: number;
}