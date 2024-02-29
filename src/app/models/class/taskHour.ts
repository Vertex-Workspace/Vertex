
export class taskHour{
    id?: number;
    initialDate?: string;
    finalDate?: string;  
    task:{
        id: number;
    }
    taskResponsable: {
        id: number;
    };
    timeSpent?: string;
  
    constructor(
        taskHour: taskHour,
    ) {
        this.id = taskHour.id;
        this.initialDate = taskHour.initialDate;
        this.finalDate = taskHour.finalDate;
        this.task = taskHour.task;
        this.taskResponsable = taskHour.taskResponsable;
        this.timeSpent = taskHour.timeSpent;
    }

}