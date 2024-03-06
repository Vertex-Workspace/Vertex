import { Chat } from "./chat";
import { Group } from "./groups";
import { Project } from "./project";
import { User } from "./user";

export class Team {

    id!: number;
    name !: string;
    creationDate !: Date;
    description !: string;
    invitationCode!: {
        code: string;
    };
    chat?: Chat;
    image ?: string;
    users?: User[];
    creator?: User;
    groups: Group[] = [];
    projects: Project[] = [];

    constructor(
        team: Team
    ) {

        this.id = team.id;
        this.name = team.name;
        this.invitationCode = team.invitationCode;
        this.chat = team.chat;
        this.creationDate = team.creationDate;
        this.description = team.description;
        this.creator = team.creator;
        this.users = team.users;
        this.groups = team.groups;

  
        this.projects = team.projects;    
        this.image = team.image;   
    }


}