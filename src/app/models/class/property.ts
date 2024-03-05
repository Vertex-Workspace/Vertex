import { Value } from "./value";

export class Property {

    id!: number;
    name!: string;
    kind!: PropertyKind;
    defaultValue?: string;
    propertyLists!: PropertyList[];
    propertyStatus!: PropertyStatus;
    
    constructor(
        property: Property
    ) {
        this.id = property.id;
        this.name = property.name;
        this.kind = property.kind;
        this.defaultValue = property.defaultValue;
        this.propertyLists = property.propertyLists;
        this.propertyStatus = property.propertyStatus;
    }

}

export class PropertyCreation {

    name!: string;
    kind!: PropertyKind;
    defaultValue?: string;
    
    constructor(
        name: string, kind: PropertyKind, defaultValue: string
    ) {
        this.name = name;
        this.kind = kind;
        this.defaultValue = defaultValue;
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
    isFixed!: boolean;

    constructor(
        property: PropertyList 
    ) {
        this.id = property.id;
        this.value = property.value;
        this.color = property.color;
        this.propertyListKind = property.propertyListKind;
        this.isFixed = property.isFixed;
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
    TODO = "TODO",
    DOING = "DOING",
    DONE = "DONE",
    VISIBLE = "VISIBLE",
    INVISIBLE = "INVISIBLE"
}
