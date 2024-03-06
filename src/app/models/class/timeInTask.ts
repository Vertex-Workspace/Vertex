export class TimeInTask{
    id?: number;
    timeInTask!: string;
    working!:boolean;

    constructor(
        timeInTask: TimeInTask
    ) {
        this.id = timeInTask.id;
        this.timeInTask = timeInTask.timeInTask;
        this.working = timeInTask.working;
    }
}