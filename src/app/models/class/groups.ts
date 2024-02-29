import { Project } from "./project";
import { User } from "./user";

export class Group {

    id!: number;
    name !: string;
    creationDate !: Date;
    description !: string;
    users: User[] = [];
    open: boolean = false;
    creator?: User;

    //List Project - Miguel
    projects?: Project[];

    constructor(
        group: Group
    ) {
        this.id = group.id;
        this.name = group.name;
        this.creationDate = group.creationDate;
        this.description = group.description;
        this.open = false;
    }

}
