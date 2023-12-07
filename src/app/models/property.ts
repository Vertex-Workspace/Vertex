import { Value } from "./value";

export class Property {

    id?: number;
    name!: string;
    kind!: PropertyKind;
    isObligated!: boolean;
    defaultValue?: string;
    propertyLists!: PropertyList[];
    
    constructor(
        property: Property
    ) {
        this.id = property.id;
        this.name = property.name;
        this.kind = property.kind;
        this.isObligated = property.isObligated;
        this.defaultValue = property.defaultValue;
        this.propertyLists = property.propertyLists;
    }

}

export class PropertyList{
    id?: number;
    value!: string;
    color!: string;
    propertyListKind!: PropertyListKind;

    constructor(
        property: PropertyList 
    ) {
        this.id = property.id;
        this.value = property.value;
        this.color = property.color;
        this.propertyListKind = property.propertyListKind;
    }
}

export enum PropertyKind {
    STATUS,
    LIST,
    TEXT,
    NUMBER,
    DATE,
    FILE
}
export enum PropertyListKind {
    TODO,
    DOING,
    DONE
}
