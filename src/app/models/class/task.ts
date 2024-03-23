
import { Comment } from "./comment";
import { Group } from "./groups";
import { Property } from "./property";
import { TaskResponsable } from "./taskResponsable";
import { User } from "./user";
import { Value, ValueCreatedWhenTaskCreated, ValueUpdate } from "./value";

export class Task {

    id!: number;
    name!: string;
    description!: string;
    values!: Value[];
    properties!: Property[];
    creator?: {
        user: {
            id: number;
        }
    }
    comments!: Comment[];

    revisable?: boolean;

    //taskHour
    taskResponsables?:TaskResponsable[];
    step?: number;

    files: any[];
    label !: string
    taskDependency !: Task

    constructor(
        task: Task
    ) {
        this.id = task.id;
        this.name = task.name;
        this.taskResponsables = task.taskResponsables;
        this.step = task.step;
        this.description = task.description;
        this.values = task.values;
        this.properties = task.properties;
        this.files = task.files;
        this.revisable = task.revisable;
        this.label = task.name;
        this.taskDependency = task.taskDependency
    }

}


export class TaskCreate {
    name: string = "Nova Tarefa";
    description: string = "Descreva um pouco sobre sua Tarefa Aqui";
    project!: {
        id: number;
    };
    values!: ValueCreatedWhenTaskCreated[];
    creator!: {
        id: number;
    };
    teamId!: number;
}

export class TaskEdit {
    id!:number;
    name!: string;
    description!: string;
    revisable?: boolean;
}


export class TaskWaitingToReview {
    id!: number;
    name!: string;
    description!: string;
    // values!: Value[];
    reviewHours!: any[];
    sender!: {
        finalDescription: string;
        username: string;
        email: string;
        date: Date;
    }
}

export class UpdateResponsibles {
    taskId !: number;
    teamId!: number;
    user !: User
    group !: Group
}
