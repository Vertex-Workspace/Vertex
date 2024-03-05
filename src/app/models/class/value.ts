
import { Property, PropertyList } from "./property";
import { Task } from "./task";

export class Value {

    id!: number;
    value!: string | PropertyList | Date | number;
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


export class ValueUpdate {
    id?: number;
    value!: {
        property: {
            id: number;
        };
        value: {
            id?: number;
            value: string | number | Date | PropertyList;
        }
    };
}


export class ValueCreatedWhenTaskCreated {
    property!: {
        id: number;
    };
    value!: {
        value: string | number | Date;
    }
}
