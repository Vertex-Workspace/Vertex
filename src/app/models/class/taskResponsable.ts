
export class TaskResponsable {

    id: number;
    userTeam: {
        id: number;
        user: {
            id: number;
        }
    }

    constructor(
        responsable: TaskResponsable
    ) {

        this.id = responsable.id;
        this.userTeam = responsable.userTeam;

    }

}
