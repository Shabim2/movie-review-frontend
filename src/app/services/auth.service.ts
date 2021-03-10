import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {shareReplay} from 'rxjs/operators'
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user:string, password:string){
    console.log('here login')
    return this.http.post<any>('http://localhost:8080/users/login', {user,password}).pipe(
      shareReplay())
  }

  public logout(){
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at")
  }

  public isLoggedIn(){
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOUt(){
    return !this.isLoggedIn();
  }

  getExpiration(){
    const expiration = localStorage.getItem("expires_at")
    const expiresAt = JSON.parse(expiration || '{}');
    return moment(expiresAt)
  }
}
