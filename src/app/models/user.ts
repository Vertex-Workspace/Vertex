import { Team } from "./team";
import { Personalization } from './personalization';

export class User {

    id ?: number | undefined;
    firstName !: string | undefined;
    lastName !: string | undefined;
    email !: string;
    password ?: string;
    passwordConf ?: string;
    description ?: string | undefined;
    location ?: string | undefined;
    image ?: string | undefined;
    personalization?:Personalization;
    theme ?: number | undefined;
    publicProfile ?: boolean = true;
    showCharts ?: boolean = false;
    //selected for groups
    selected ?: boolean = false;

    //brainstorming
    teams?: Team[] = [];

    constructor(
        user: User
    ) {

        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;

        if (user.passwordConf) {
            this.passwordConf = user.passwordConf;
        }
        
        this.personalization = user.personalization;
        this.description = user.description;
        this.location = user.location;
        this.image = user.image;
        this.theme = user.theme;
        this.publicProfile = user.publicProfile;
        this.showCharts = user.showCharts;
        this.selected = user.selected;

    }

}
