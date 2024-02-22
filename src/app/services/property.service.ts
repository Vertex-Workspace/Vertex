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

  public createOrEditProperty(projectID:number, property : Property): Observable<Property> {
    return this.http.post<Property>(`${URL}property/project/${projectID}`, property);
  }

  public deleteProperty(projectID:number, propertyId : number): Observable<Property> {
    return this.http.delete<Property>(`${URL}property/${propertyId}/project/${projectID}`, {});
  }

  public deletePropertyList(propertyID:number, propertyListId : number): Observable<Property> {
    return this.http.delete<Property>(`${URL}property/${propertyID}/property-list/${propertyListId}`, {});
  }
}
