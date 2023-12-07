
import { Property, PropertyList } from "./property";
import { Task } from "./task";

export class Value {

    id!: number;
    value!: string | PropertyList;
    property!: Property;
    task!: Task;

    constructor(
        value: Value
    ) {

        this.id = value.id;
        this.value = value.value;
        this.property = value.property;
        this.task = value.task;
    }

}
