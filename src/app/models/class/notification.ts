


export class Notification {
    id !: number;
    teamName !: string;
    projectName !: string;
    title !: string;
    isRead!: boolean;
    date !: Date;
    linkRedirect !: string;

    //Front-end Logic
    isSelected !: boolean;
}