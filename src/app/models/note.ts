export class Note {
    id ?: number | undefined;
    title !: string;
    description !: string;
    width !: number;
    height !: number;
    color !: string;
    positionX ?: number | undefined;
    positionY ?: number | undefined;

    constructor(
        note: Note,
    ) {
        this.id = note.id;
        this.title = note.title;
        this.description = note.description;
        this.width = note.width;
        this.height = note.height;
        this.color = note.color;
        this.positionX = note.positionX;
        this.positionY = note.positionY;
    }
}
