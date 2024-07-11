import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../../models/Authentication/login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

// export class AuthService {
//   private loggedInUserSubject: BehaviorSubject<boolean>;
//   public loggedInUser$: Observable<boolean>;
//    userRoleSubject: BehaviorSubject<string | null>;
//  public userRole$: Observable<string | null>;

//   constructor(private http: HttpClient) {
//     const token = localStorage.getItem('token');
//     this.loggedInUserSubject = new BehaviorSubject<boolean>(!!token);
//     this.loggedInUser$ = this.loggedInUserSubject.asObservable();
//   this.userRoleSubject = new BehaviorSubject<string | null>(this.getRoleFromToken(token));
//   this.userRole$ = this.userRoleSubject.asObservable();
//   }

//   login(username: string, password: string): Observable<any> {
//     return this.http.post<any>(`${environment.baseUrl}/Account/Login`, { username, password })
//       .pipe(
//         tap(response => {
//           if (response.isSuccess) {
//             localStorage.setItem('token', response.data.token);
//             this.setLoggedInState(true);
//             const role = this.getRoleFromToken(response.data.token);
//             this.userRoleSubject.next(role);
//             console.log("Login Role:", role);
//           }
//         })
//       );
//   }

//   logout(): void {
//     const token = localStorage.getItem('token');
//     if (token) {
//       this.http.post(`${environment.baseUrl}/Account/logout`, {}, { headers: { 'Authorization': `Bearer ${token}` } }).subscribe(() => {
//         localStorage.removeItem('token');
//         this.setLoggedInState(false);
//         this.userRoleSubject.next(null);
//       });
//     }
//   }
//   getRoleFromToken(token: string | null): string | null {
//     if (!token) return null;
//     try {
//       const decoded: any = jwtDecode(token);
//       return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       return null;
//     }
//   }

//   getUserRole(): Observable<string | null> {
//     return this.userRoleSubject.asObservable();
//   }


//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   setLoggedInState(isLoggedIn: boolean): void {
//     this.loggedInUserSubject.next(isLoggedIn);
//   }
// }

export class AuthService {
  private loggedInUserSubject: BehaviorSubject<boolean>;
  public loggedInUser$: Observable<boolean>;
  public userRoleSubject: BehaviorSubject<string | null>;
  public userRole$: Observable<string | null>;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.loggedInUserSubject = new BehaviorSubject<boolean>(!!token);
    this.loggedInUser$ = this.loggedInUserSubject.asObservable();
    this.userRoleSubject = new BehaviorSubject<string | null>(this.getRoleFromToken(token));
    this.userRole$ = this.userRoleSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/Account/Login`, { username, password })
      .pipe(
        tap(response => {
          if (response.isSuccess) {
            localStorage.setItem('token', response.data.token);
            this.setLoggedInState(true);
            const role = this.getRoleFromToken(response.data.token);
            this.userRoleSubject.next(role);
            console.log("Login Role:", role);  // Log the role for debugging
          }
        })
      );
  }

  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.post(`${environment.baseUrl}/Account/logout`, {}, { headers: { 'Authorization': `Bearer ${token}` } }).subscribe(() => {
        localStorage.removeItem('token');
        console.log("removed");
        this.setLoggedInState(false);
        this.userRoleSubject.next(null);
      });
    }
  }

  getRoleFromToken(token: string | null): string | null {
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserRole(): Observable<string | null> {
    return this.userRole$;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  setLoggedInState(isLoggedIn: boolean): void {
    this.loggedInUserSubject.next(isLoggedIn);
  }
}
