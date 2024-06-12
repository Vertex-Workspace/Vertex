import { Injectable } from '@angular/core';
import { URL } from './path/api_url';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SearchItem } from '../models/class/search-item';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  public findTeams(loggedId: number, query: string): Observable<SearchItem[]> {
    return this.http
      .get<SearchItem[]>(`${URL}team/query/${query}/${loggedId}` , {withCredentials: true})
      .pipe(map((items: SearchItem[]) => 
        items.map((item: SearchItem) => new SearchItem(item))
      ));
  }

  public findUsers(loggedId: number, query: string): Observable<SearchItem[]> {
    return this.http
      .get<SearchItem[]>(`${URL}user/query/${query}/${loggedId}` , {withCredentials: true})
      .pipe(map((items: SearchItem[]) => 
        items.map((item: SearchItem) => new SearchItem(item))
      ));
  }

  public findProjects(loggedId: number, query: string): Observable<SearchItem[]> {
    return this.http
      .get<SearchItem[]>(`${URL}project/query/${query}/${loggedId}` , {withCredentials: true})
      .pipe(map((items: SearchItem[]) => 
        items.map((item: SearchItem) => new SearchItem(item))
      ));
  }

  public findTasks(loggedId: number, query: string): Observable<SearchItem[]> {
    return this.http
      .get<SearchItem[]>(`${URL}task/query/${query}/${loggedId}` , {withCredentials: true})
      .pipe(map((items: SearchItem[]) => 
        items.map((item: SearchItem) => new SearchItem(item))
      ));
  }

  public getSearchedItems(id: number, query: string): Observable<SearchItem[]> {
    const teams$ = this.findTeams(id, query);
    const users$ = this.findUsers(id, query);
    const projects$ = this.findProjects(id, query);
    const tasks$ = this.findTasks(id, query);

    return forkJoin([teams$, users$, projects$, tasks$]).pipe(
      map(([teams, users, projects, tasks]) => [...teams, ...users, ...projects, ...tasks])
    );
  }
}
