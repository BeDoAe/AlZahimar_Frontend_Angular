import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelativeRegisterDTO } from '../../../models/Authentication/relative-register-dto';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RelativeRegisterServiceService {
  //private apiUrl = 'https://api.yourserver.com/register-relative'; // Replace with your API endpoint
  private apiUrl = `${environment.baseUrl}/Account/RegisterRelative`;

  constructor(private http: HttpClient) {}

  registerRelative(registerDto: RelativeRegisterDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, registerDto, { headers });
  }
}
