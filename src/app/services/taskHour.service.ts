import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { URL } from './path/api_url';
import { Group } from '../models/class/groups';
import { taskHour } from '../models/class/taskHour';

@Injectable({
    providedIn: 'root'
})
export class taskHourService {

    constructor(
        private http: HttpClient
    ) { }

    public saveTaskHour(taskHour: taskHour): Observable<taskHour> {
        

        return this.http
        .post<taskHour>(`${URL}task-hours/${taskHour.task.id}/${taskHour.taskResponsable.id}`, null, {withCredentials: true});
    }

    public patchTaskHour(taskHour: taskHour): Observable<taskHour> {
        
        
        return this.http
        .patch<taskHour>(`${URL}task-hours/edit`, taskHour, {withCredentials: true});
    }

    public getTimeInTask(id:number): Observable<any> {
        return this.http
        .get<any>(`${URL}task-hours/time-in-task/${id}`, {withCredentials: true});
    }


}