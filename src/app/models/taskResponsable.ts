import { User } from "./user";

export class TaskResponsable {

    id: number;
    userTeam: {
        id: number;
        user: User;
    }

    constructor(
        responsable: TaskResponsable
    ) {

        this.id = responsable.id;
        this.userTeam = responsable.userTeam;

    }

}
