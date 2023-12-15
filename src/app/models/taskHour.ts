import { User } from 'src/app/models/user';
export interface TaskHourModel {
    id: number;
    initialDate: string;
    finalDate: string;  
    task:{
        id: number;
    }
    taskResponsable: {
        id: number;
    };
    timeSpent: string;
  }