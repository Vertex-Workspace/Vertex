export class Note {
    id ?: number | undefined;
    title !: string;
    description !: string;
    width !: number;
    height !: number;
    color !: string;
    left ?: number | undefined;
    top ?: number | undefined;

    constructor(
        note: Note,
    ) {
        this.id = note.id;
        this.title = note.title;
        this.description = note.description;
        this.width = note.width;
        this.height = note.height;
        this.color = note.color;
        this.left = note.left;
        this.top = note.top;
    }
}
