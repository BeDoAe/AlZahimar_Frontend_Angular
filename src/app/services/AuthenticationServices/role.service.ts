import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl=`${environment.baseUrl}/Account/GetRole`;
  constructor(private http: HttpClient) { }

  getUserRole(): Observable<string> {
    return this.http.get<string>(this.apiUrl, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Unknown error occurred';
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          console.error(errorMessage);
          return throwError(errorMessage);
        })
      );
  }
}
