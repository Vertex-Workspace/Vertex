import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { URL } from './path/api_url';
import { Group } from '../models/groups';
import { taskHour } from '../models/taskHour';

@Injectable({
    providedIn: 'root'
})
export class taskHourService {

    constructor(
        private http: HttpClient
    ) { }

    public saveTaskHour(taskHour: taskHour): Observable<taskHour> {
        return this.http
        .post<taskHour>("http://localhost:7777/task-hours", taskHour);
    }

    public patchTaskHour(taskHour: taskHour): Observable<taskHour> {

        return this.http
        .patch<taskHour>("http://localhost:7777/task-hours/edit", taskHour);
    }

    public getTimeInTask(id:number): Observable<any> {
        return this.http
        .get<any>("http://localhost:7777/task-hours/time-in-task/"+id);
    }


}