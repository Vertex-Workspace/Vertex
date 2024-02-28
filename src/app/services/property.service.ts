import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Project } from '../models/project';
import { URL } from './path/api_url';
import { Task } from '../models/task';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private http: HttpClient
  ) { }

  public createOrEditProperty(projectID:number, property : Property): Observable<Project> {
    return this.http.post<Project>(`${URL}property/project/${projectID}`, property);
  }

  public deleteProperty(projectID:number, propertyId : number): Observable<Project> {
    return this.http.delete<Project>(`${URL}property/${propertyId}/project/${projectID}`, {});
  }

  public deletePropertyList(propertyID:number, propertyListId : number): Observable<Project> {
    return this.http.delete<Project>(`${URL}property/${propertyID}/property-list/${propertyListId}`, {});
  }
}
