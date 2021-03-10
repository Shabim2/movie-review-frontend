import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviedetailService {
  httpUrl = 'http://localhost:8080/moviedetail/'
  httpOptions ={
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private http: HttpClient) { }

  getMovie(id: number): Observable<any>{
    return this.http.get<any>(`${this.httpUrl}movie/${id}`)
  }
  getComments(id: number): Observable<any>{
    return this.http.get<any>(`${this.httpUrl}comments/${id}`)
  }
  addComment(body,movie,user,username): Observable<any>{
    console.log('here')
    body.movie = movie;
    body.user = user;
    body.username = username;
    return this.http.post<any>(`${this.httpUrl}comment`,body)
  }
  deleteComment(id): Observable<any>{
    return this.http.delete<any>(`${this.httpUrl}${id}`)
  }
  editComment(body,id): Observable<any>{
    return this.http.put<any>(`${this.httpUrl}comment/${id}`,body)
  }
  postLike(body): Observable<any>{
    return this.http.post<any>(`${this.httpUrl}likes`,body)
  }

  
}
