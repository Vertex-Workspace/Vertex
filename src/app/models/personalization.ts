

export class Personalization{

    id !: number;
    primaryColor!: string ;
    secondColor?: string;
    fontFamily?: string;
    fontSize?: number;
    theme?: number;
    listeningText?: boolean;
    voiceCommand?: boolean;


    constructor(
        personalization: Personalization,
    ) {
        this.id = personalization.id;
        this.primaryColor = personalization.primaryColor;
        this.secondColor = personalization.secondColor;
        this.fontFamily = personalization.fontFamily;
        this.fontSize = personalization.fontSize;
        this.theme = personalization.theme;
        this.voiceCommand = personalization.voiceCommand;
        this.listeningText = personalization.listeningText;
    }
}