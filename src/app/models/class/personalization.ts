

export class Personalization{

    id !: number;
    primaryColorLight!: string ;
    secondColorLight!: string;
    primaryColorDark!: string ;
    secondColorDark!: string;
    fontFamily?: string;
    fontSize?: number;
    theme?: number;
    listeningText?: boolean;
    voiceCommand?: boolean;


    constructor(
        personalization: Personalization,
    ) {
        this.id = personalization.id;
        this.primaryColorLight = personalization.primaryColorLight;
        this.secondColorLight = personalization.secondColorLight;
        this.primaryColorDark = personalization.primaryColorDark;
        this.secondColorDark = personalization.secondColorDark;
        this.fontFamily = personalization.fontFamily;
        this.fontSize = personalization.fontSize;
        this.theme = personalization.theme;
        this.voiceCommand = personalization.voiceCommand;
        this.listeningText = personalization.listeningText;
    }
}