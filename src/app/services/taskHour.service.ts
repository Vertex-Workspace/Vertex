import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "./path/api_url";
import { TaskHourModel } from '../models/taskHour';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskHourService {

    constructor(private http: HttpClient) { }

    public saveCurrentDate(taskHour: TaskHourModel): Observable<TaskHourModel> {
        return this.http.post<TaskHourModel>(`${URL}task-hours`, taskHour);
    }

    public patchCurrentDate(taskHour: TaskHourModel): Observable<TaskHourModel> {
        return this.http.patch<TaskHourModel>(`${URL}task-hours/${taskHour.id}`, taskHour);
    }

    public getTimeInTask(id: number): Observable<TaskHourModel> {
        return this.http.get<TaskHourModel>(`${URL}${id}`);

    }

}
