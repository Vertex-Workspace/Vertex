
import { Property } from "./property";
import { Value } from "./value";

export class Task {

    id!: number;
    name!: string;
    description?: string;
    values!: Value[];
    properties!: Property[];


    //mural
    width?: string;
    height?: string;
    top?: string;
    left?: string;

    constructor(
        team: Task
    ) {
        this.id = team.id;
    }

}


export class TaskCreate {
    name: string = "Nova Tarefa";
    description: string = "Descreva um pouco sobre sua Tarefa Aqui";
    project!: {
        id: number;
    };
    values = [];
    creator!: {
        id: number;
    };
}
