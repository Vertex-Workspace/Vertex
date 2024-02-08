import { Team } from "./team";
import { Personalization } from './personalization';

export class User {

    id ?: number ;
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
    //open component with user permissions in team-informations
    openPermission ?: boolean = false;
    permissions ?: Permission[];

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
        this.openPermission = user.openPermission;
        this.permissions = user.permissions

    }
}

export class Permission {
    id?: number;
    name : PermissionsType;
    user ?: User;
    team ?: Team;
    label?: String
    selected ?: boolean

    constructor(permission : Permission){
        this.id = permission.id;
        this.name = permission.name;
        this.user = permission.user;
        this.team = permission.team;
    }
}

export enum PermissionsType {
    CREATE = "CREATE",
    EDIT = "EDIT", 
    VIEW = "VIEW",
    DELETE = "REMOVE"
}

export class CreatePermission {
    name !: PermissionsType;
    userId ?:number
    team !: {
        id:number
    }
    
}
