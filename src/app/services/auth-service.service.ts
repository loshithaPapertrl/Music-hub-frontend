import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {}

  login(obj:any) : Observable<any>{
    return this.http.post('http://localhost:8080/api/v1/auth/authenticate', obj)
  }

  // login(email: string, password: string) {
  //   return this.http.post('http://localhost:8080/api/v1/auth/authenticate', { email, password })
  // }
  //
  // setToken(token: string): void {
  //   localStorage.setItem(this.tokenKey, JSON.stringify(token));
  // }
  //
  // getToken(): string | null {
  //   const token = localStorage.getItem(this.tokenKey);
  //   return token ? JSON.parse(token) : null;
  // }
  //
  //
  // removeToken(): void {
  //   localStorage.removeItem(this.tokenKey);
  // }
}
