import { Value } from "./value";

export class Property {

    id!: number;
    name!: string;
    kind!: PropertyKind;
    isObligated!: boolean;
    defaultValue?: string;
    propertyLists!: PropertyList[];
    propertyStatus!: PropertyStatus;
    
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

export enum PropertyStatus{
    FIXED = "FIXED",
    VISIBLE = "VISIBLE",
    INVISIBLE = "INVISIBLE",
}

export class PropertyList{
    id!: number;
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
    STATUS = "STATUS",
    LIST = "LIST",
    TEXT = "TEXT",
    NUMBER = "NUMBER",
    DATE = "DATE",
    FILE = "FILE"
}
export enum PropertyListKind {
    TODO,
    DOING,
    DONE
}
