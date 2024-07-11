import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../../models/Authentication/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = `${environment.baseUrl}/Account/Login`; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { username, password });
  }
}
