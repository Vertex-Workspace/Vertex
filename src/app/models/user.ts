import { Team } from "./team";

export class User {

    id ?: number | undefined;
    firstName !: string;
    lastName !: string;
    email !: string;
    password !: string;
    passwordConf ?: string;
    description ?: string | undefined;
    location ?: string | undefined;
    image ?: string | undefined;
    publicProfile ?: boolean = true;
    showCharts ?: boolean = false;

    //brainstorming
    teams?: Team[] = [];

    constructor(
        user: User
    ) {

        // this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;

        if (user.passwordConf) {
            this.passwordConf = user.passwordConf;
        }
        
        this.description = user.description;
        this.location = user.location;
        this.image = user.image;
        this.publicProfile = user.publicProfile;
        this.showCharts = user.showCharts;

    }

}
