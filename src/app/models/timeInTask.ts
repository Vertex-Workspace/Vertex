export class TimeInTask{
    id?: number;
    timeInTask!: string;
    workingOnTask!:boolean;

    constructor(
        timeInTask: TimeInTask
    ) {
        this.id = timeInTask.id;
        this.timeInTask = timeInTask.timeInTask;
        this.workingOnTask = timeInTask.workingOnTask;
    }
}