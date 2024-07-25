import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private API_LOGIN_URL: string = "http://localhost:8080/test/api/auth/login";

  constructor(private httpClient: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.httpClient.post<any>(this.API_LOGIN_URL, credentials)
  }

  verifyCredentials(email: string, password: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/test/api/auth/${email}/${password}`);
  }
}