import { Property } from "./property";
import { Task } from "./task";
import { Team } from "./team";
import { User } from "./user";

export class Project {
    id ?: number;
    name !: string;
    team ?: Team;
    description ?: string;
    image ?: string;
    creator ?: User;
    projectDependency ?: Project;
    tasks : Task[]; 
    properties!: Property[];

    constructor(
        project: Project,
    ) {
        // this.id = project.id;
        this.name = project.name;
        this.team = project.team;
        this.description = project.description;
        this.image = project.description;
        this.tasks = project.tasks;
        this.properties = project.properties;
    }

}
