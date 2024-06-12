import { Point } from "chart.js";

interface Position {
    x: number,
    y: number
}

export class Note {
    id ?: number;
    title !: string;
    description !: string;
    width !: number;
    height !: number;
    color !: string;
    posX!: number;
    posY!: number;
    files !: any[];

    constructor(
        note: Note,
    ) {
        this.id = note.id;
        this.title = note.title;
        this.description = note.description;
        this.width = note.width;
        this.height = note.height;
        this.color = note.color;
        this.files = note.files;
        this.posX = note.posX;
        this.posY = note.posY;
    }
}