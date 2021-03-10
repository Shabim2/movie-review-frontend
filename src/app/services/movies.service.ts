import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  itemsUrl = 'http://localhost:8080/dash/'

  httpOptions ={
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(
    private http: HttpClient,
  ) { }

  getItems(): Observable<any>{
    return this.http.get<any>(`${this.itemsUrl}`)
  }
  addItem(body): Observable<any>{
    return this.http.post<any>(`${this.itemsUrl}`,body)
  }
  editItem(id,body): Observable<any>{
    return this.http.put<any>(`${this.itemsUrl}${id}`,body)
  }
  deleteItem(id): Observable<any>{
    return this.http.delete<any>(`${this.itemsUrl}${id}`)
  }
  getRole(): Observable<any>{
    return this.http.get<any>(`${this.itemsUrl}/user`)
  }
}
