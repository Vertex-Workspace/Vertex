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
    projectDependency !: Project;
    tasks : Task[]; 
    notes : Note[] = [];
    properties !: Property[];
    idTeam!: number;
    listOfResponsibles !: Group[] | User[]
    groups?: Group[]
    users?: User[]
    projectReviewENUM!: ProjectReview; 
    

    constructor(
        project: Project,
    ) {
        console.log(project);
        
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
        this.projectDependency = project.projectDependency
        this.groups = project.groups
        this.users = project.users
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

export class ProjectEdit {

    id ?:number;
    name?: string;
    description?: string;
    projectDependency ?: Project;
    users ?:  User[];
    groups ?: Group[];
    projectReviewENUM ?: ProjectReview;
}

export class ProjectCollaborators{
    users !: User[];
    groups !: Group[];
    userInGroups !: User[];
}

export enum ProjectReview {
    MANDATORY,
    OPTIONAL,
    EMPTY,
}
