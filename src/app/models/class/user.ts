import { Team } from "./team";
import { Personalization } from './personalization';
import { Task } from "./task";

export class User {
    

    id ?: number;
    firstName !: string | undefined;
    lastName !: string | undefined;
    fullname ?: string;
    email !: string;
    password ?: string;
    passwordConf ?: string;
    description ?: string | undefined;
    location ?: string | undefined;
    image ?: string | undefined;
    imgUrl ?: string;
    personalization?:Personalization;
    theme ?: number | undefined;
    publicProfile ?: boolean = true;
    showCharts ?: boolean = false;
    //selected for groups
    selected ?: boolean = false;
    //open component with user permissions in team-informations
    openPermission ?: boolean = false;
    openInfo ?: boolean = false;
    permissions ?: Permission[];
    label ?: string;
    icon ?: string;
    selectedProject ?: boolean;
    firstAccess ?: boolean;

    taskReview ?: boolean;
    newMembersAndGroups ?: boolean;
    permissionsChanged ?: boolean;
    responsibleInProjectOrTask ?: boolean;
    anyUpdateOnTask ?: boolean;
    sendToEmail ?: boolean;
    registerDay ?: string

    time?: any;
    //graphics
    tasksPerformances ?: number[];

    tasksInCommon? : any[];

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
        
        this.firstAccess = user.firstAccess;
        this.personalization = user.personalization;
        this.description = user.description;
        this.location = user.location;
        if (user.image) this.image = user.image;
        if (user.imgUrl) this.imgUrl = user.imgUrl;
        this.theme = user.theme;
        this.publicProfile = user.publicProfile;
        this.showCharts = user.showCharts;
        this.selected = user.selected;
        this.openPermission = user.openPermission;
        this.permissions = user.permissions
        this.label = user.firstName
        this.selectedProject = user.selectedProject        

    }
}

export class Permission {
    id?: number;
    name ?: PermissionsType;
    user ?: User;
    team ?: Team;
    label?: String
    enabled?: boolean

    constructor(permission : Permission){
        this.id = permission.id;
        this.name = permission.name;
        this.user = permission.user;
        this.team = permission.team;
        this.label = permission.label
        this.enabled = permission.enabled;
    }
}

export enum PermissionsType {
    CREATE = "Criar",
    EDIT = "Editar", 
    VIEW = "Visualizar",
    DELETE = "Deletar"
}

export class HasPermission {
    projectId ?: number
    userId ?: number
    permission ?: Permission 
}

export class ChangePassword {
    id ?: number
    password ?: string
}
