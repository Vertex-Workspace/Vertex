import { Project } from "./project";
import { User } from "./user";

export class Group {

    id ?: number | undefined;
    name !: string;
    creationDate !: Date;
    description !: string;
    users: User[] = [];

    creator?: User;

    //List Project - Miguel
    projects?: Project[];

    constructor(
        team: Group
    ) {

        this.id = team.id;
        this.name = team.name;
        this.creationDate = team.creationDate;
        this.description = team.description;
    }

}
