import { Group } from "./groups";
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
    image ?: string;
    creator ?: UserTeam;
    projectDependency ?: Project;
    tasks : Task[]; 
    notes : Note[] = [];
    properties!: Property[];
    idTeam?: number;
    listOfResponsibles ?: Group[] | User[]
    projectReviewENUM!: ProjectReview; 
    

    constructor(
        project: Project,
    ) {
        this.id = project.id;
        this.name = project.name;
        this.team = project.team;
        this.description = project.description;
        this.image = project.image;
        this.tasks = project.tasks;
        this.notes = project.notes;
        this.properties = project.properties;
        this.idTeam = project.idTeam;
        this.projectReviewENUM = project.projectReviewENUM;
        // this.collaborators = project.collaborators
        // this.groups = project.groups
        this.listOfResponsibles = project.listOfResponsibles
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
export class ProjectResponsible {
    user ?: User
    group ?: Group

}

export enum ProjectReview {
    MANDATORY,
    OPTIONAL,
    EMPTY,
}