import { Project } from "./project";
import { Task } from "./task";
import { Team } from "./team";
import { User } from "./user";

export class Group {

    id!: number;
    name ?: string;
    creationDate ?: Date;
    description ?: string;
    users !: User[];
    open?: boolean = false;
    creator?: User;
    team ?: Team
    label ?: string
    children !: User[] 
    icon ?: string
    selected ?: boolean
    size ?: number
    userTeams ?: any[]
    tasks !: Task[]

    //List Project - Miguel
    projects?: Project[];


    constructor(
        group: Group
    ) {
        this.id = group.id;
        this.name = group.name;
        this.creationDate = group.creationDate;
        this.description = group.description;
        this.team = group.team;
        this.open = false;
        this.label = group.name;
        this.children = group.users
        this.selected = group.selected
        this.size = group.size
        this.userTeams = group.userTeams

    }

}
