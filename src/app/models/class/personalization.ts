

export class Personalization{

    id !: number;
    primaryColor!: string ;
    fontFamily?: string;
    fontSize?: number;
    theme?: number;
    listeningText?: boolean;
    signLanguage?: boolean;
    language?: string;
    linkLanguageImage?: string;


    constructor(
        personalization: Personalization,
    ) {
        this.id = personalization.id;
        this.primaryColor = personalization.primaryColor;
        this.fontFamily = personalization.fontFamily;
        this.fontSize = personalization.fontSize;
        this.theme = personalization.theme;
        this.signLanguage = personalization.signLanguage;
        this.listeningText = personalization.listeningText;
        this.language = personalization.language;
    }
}