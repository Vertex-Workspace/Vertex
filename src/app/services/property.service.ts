import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Project } from '../models/class/project';
import { URL } from './path/api_url';
import { Task } from '../models/class/task';
import { Property, PropertyList } from '../models/class/property';

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

  public changeColor(propertyList : PropertyList): Observable<Property> {
    return this.http.patch<Property>(`${URL}property/property-list-color`, propertyList);
  }
}
