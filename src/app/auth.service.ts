import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiResponse} from "../app/core/apiresponse";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
    ) { }

  // login(username: string, password: string): Observable<boolean> {
  //   return this.http.post<{token: string}>('/api/auth', {username: username, password: password})
  //     .pipe(
  //       map(result => {
  //         localStorage.setItem('access_token', result.token);
  //         return true;
  //       })
  //     );
  // }

  login(loginPayload) : Observable<any> {
    return this.http.post<ApiResponse>('http://localhost:8080/' + 'token/generate-token', loginPayload)
    .pipe(
      map((_r: any) => {  
        window.localStorage.setItem('token', _r.result.token);
        console.log(_r)
        console.log(this.jwtHelperService.decodeToken(_r.result.token));
        console.log(this.jwtHelperService.decodeToken(_r.result.token)['scopes'][0]['authority']);
        console.log(this.jwtHelperService.decodeToken(_r.result.token.exp));     
        return _r;
      })
    );
    
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
