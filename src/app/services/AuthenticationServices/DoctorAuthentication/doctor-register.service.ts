import { HttpClient, HttpHeaders } from '@angular/common/http';   
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment.development';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorRegisterService {
  private apiUrl = `${environment.baseUrl}/Account/Register/Doctor`;

  constructor(private _httpClient: HttpClient) {}
  registerDoctor(registerDto: any): Observable<any> {
    //const token = localStorage.getItem('Token')
     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //const headers = new HttpHeaders({ 'autherziation':`Bearer ${token}`, 'Content-Type': 'application/json'  });

    return this._httpClient.post(this.apiUrl, registerDto, { headers });
  }
  isUsernameTaken(userName: string): Observable<boolean> {
    return this._httpClient.get<boolean>(`${this.apiUrl}/CheckUsername`, { params: { userName } });
  }
}
