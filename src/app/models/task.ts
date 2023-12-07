
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
