import { Note } from "./note";
import { Property } from "./property";
import { Task } from "./task";
import { Team } from "./team";
import { User } from "./user";

export class Project {
    id !: number;
    name !: string;
    team : Team;
    description ?: string;
    image ?: string | undefined;
    creator ?: UserTeam;
    projectDependency ?: Project;
    tasks : Task[]; 
    notes : Note[];
    properties!: Property[];
    idTeam?: number;

    constructor(
        project: Project,
    ) {
        this.id = project.id;
        this.name = project.name;
        this.team = project.team;
        this.description = project.description;
        this.image = project.description;
        this.tasks = project.tasks;
        this.notes = project.notes;
        this.properties = project.properties;
        this.idTeam = project.idTeam;
    }

}

interface UserTeam {
    user: {
        id: number
    },
    team: {
        id: number
    }
}