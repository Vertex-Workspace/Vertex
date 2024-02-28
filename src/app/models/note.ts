import { Point } from "chart.js";

interface Position {
    x: number,
    y: number
}

export class Note {
    id ?: number | undefined;
    title !: string;
    description !: string;
    width !: number;
    height !: number;
    color !: string;
    positionX!: number;
    positionY!: number;

    constructor(
        note: NoteGet,
    ) {
        this.id = note.id;
        this.title = note.title;
        this.description = note.description;
        this.width = note.width;
        this.height = note.height;
        this.color = note.color;
        this.positionX = note.position.x - 196;
        this.positionY = note.position.y - 243;
    }
};

export class NoteGet {
    id ?: number | undefined;
    title !: string;
    description !: string;
    width !: number;
    height !: number;
    color !: string;
    position: Point;

    constructor(
        note: Note,
    ) {
        this.id = note.id;
        this.title = note.title;
        this.description = note.description;
        this.width = note.width;
        this.height = note.height;
        this.color = note.color;
        this.position = {
            x: note.positionX,
            y: note.positionY
        };
    }
}
