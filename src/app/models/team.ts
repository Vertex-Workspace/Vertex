import { Group } from "./groups";
import { Project } from "./project";
import { User } from "./user";

export class Team {

    id?: number;
    name !: string;
    creationDate !: Date;
    description !: string;
    users?: User[];

    creator?: User;

    groups?: Group[];
    //List Project - Miguel
    projects?: Project[];

    constructor(
        team: Team
    ) {

        this.id = team.id;
        this.name = team.name;
        this.creationDate = team.creationDate;
        this.description = team.description;
    }

}