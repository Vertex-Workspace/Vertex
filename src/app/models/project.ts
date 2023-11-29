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
    taskList : Task[]; 

    constructor(
        project: Project,
    ) {
        // this.id = project.id;
        this.name = project.name;
        this.team = project.team;
        this.description = '';
        this.image = '';
        this.taskList = [];

    }

}
