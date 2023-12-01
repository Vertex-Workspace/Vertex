

export class Personalization{

    id?: number;
    listeningText?: boolean;
    voiceCommand?: boolean;
    primaryColor?: number;
    secondColor?: number;
    fontFamily?: number;
    fontSize?: number;


    constructor(
        personalization: Personalization,
    ) {
        this.id = personalization.id;
        this.listeningText = personalization.listeningText;
        this.voiceCommand = personalization.voiceCommand;
        this.primaryColor = personalization.primaryColor;
        this.secondColor = personalization.secondColor;
        this.fontFamily = personalization.fontFamily;
        this.fontSize = personalization.fontSize;
    }
}