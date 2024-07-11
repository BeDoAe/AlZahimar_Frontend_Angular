import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FilterDoctorDTO } from '../../models/Doctor/filter-doctor-dto';
import { GeneralResponse } from '../../models/Story/general-response';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }
  getDoctors(): Observable<FilterDoctorDTO[]> {
    return this.http.get<any>(`${environment.baseUrl}/Doctor/Doctors`)
      .pipe(
        map(response => {
          if (Array.isArray(response)) {
            return response as FilterDoctorDTO[]; // Directly return the array if no wrapper object
          } else if (response.isSuccess) {
            return response.data as FilterDoctorDTO[]; // Extract data array if wrapped
          } else {
            throw new Error('Unexpected API response format');
          }
        }),
        catchError(error => {
          console.error('Error fetching doctors:', error);
          return throwError(error); // Rethrow the error
        })
      );
  }

  searchDoctorsByName(name: string): Observable<FilterDoctorDTO[]> {
    return this.http.get<any>(`${environment.baseUrl}/Doctor/Doctor/${name}`)
      .pipe(
        map(response => {
          if (Array.isArray(response)) {
            return response as FilterDoctorDTO[]; // Directly return the array if no wrapper object
          } else if (response.isSuccess) {
            return response.data as FilterDoctorDTO[]; // Extract data array if wrapped
          } else {
            throw new Error('Unexpected API response format');
          }
        }),
        catchError(error => {
          console.error('Error searching doctors:', error);
          return throwError(error); // Rethrow the error
        })
      );
  }

  getFilteredFemaleDoctors(filters: any): Observable<FilterDoctorDTO[]> {
    return this.http.get<any>(`${environment.baseUrl}/Doctor/FilteredFemaleDoctor`)
      .pipe(
        map(response => {
          if (Array.isArray(response)) {
            return response as FilterDoctorDTO[]; // Directly return the array if no wrapper object
          } else if (response.isSuccess) {
            return response.data as FilterDoctorDTO[]; // Extract data array if wrapped
          } else {
            throw new Error('Unexpected API response format');
          }
        }),
        catchError(error => {
          console.error('Error fetching doctors:', error);
          return throwError(error); // Rethrow the error
        })
      );
  }

  getFilteredMaleDoctors(filters: any): Observable<FilterDoctorDTO[]> {
    return this.http.get<any>(`${environment.baseUrl}/Doctor/FilteredMaleDoctor`)
      .pipe(
        map(response => {
          if (Array.isArray(response)) {
            return response as FilterDoctorDTO[]; // Directly return the array if no wrapper object
          } else if (response.isSuccess) {
            return response.data as FilterDoctorDTO[]; // Extract data array if wrapped
          } else {
            throw new Error('Unexpected API response format');
          }
        }),
        catchError(error => {
          console.error('Error fetching doctors:', error);
          return throwError(error); // Rethrow the error
        })
      );
  }

  getDoctorsByAgeGreater(age?: string): Observable<FilterDoctorDTO[]> {
    let params = new HttpParams();
    if (age) {
      params = params.set('age', age);
    }

    return this.http.get<any>(`${environment.baseUrl}/Doctor/DoctorsByAgeGreaterThan${age}`)
      .pipe(
        map(response => {
          if (Array.isArray(response)) {
            return response as FilterDoctorDTO[]; // Directly return the array if no wrapper object
          } else if (response.isSuccess) {
            return response.data as FilterDoctorDTO[]; // Extract data array if wrapped
          } else {
            throw new Error('Unexpected API response format');
          }
        }),
        catchError(error => {
          console.error('Error fetching doctors by age:', error);
          return throwError(error); // Rethrow the error
        })
      );
  }

  getDoctorsByAgeSmaller(age?: string): Observable<FilterDoctorDTO[]> {
    let params = new HttpParams();
    if (age) {
      params = params.set('age', age);
    }

    return this.http.get<any>(`${environment.baseUrl}/Doctor/DoctorsByAgeSmallerThan${age}`)
      .pipe(
        map(response => {
          if (Array.isArray(response)) {
            return response as FilterDoctorDTO[]; // Directly return the array if no wrapper object
          } else if (response.isSuccess) {
            return response.data as FilterDoctorDTO[]; // Extract data array if wrapped
          } else {
            throw new Error('Unexpected API response format');
          }
        }),
        catchError(error => {
          console.error('Error fetching doctors by age:', error);
          return throwError(error); // Rethrow the error
        })
      );
  }
  getDoctorsByPriceRange(endRange: string): Observable<FilterDoctorDTO[]> {
    let params = new HttpParams();
    params = params.set('EndRange', endRange);

    return this.http.get<any>(`${environment.baseUrl}/Doctor/DoctorsByPriceRange`, { params })
      .pipe(
        map(response => {
          if (response.isSuccess && Array.isArray(response.data)) {
            return response.data as FilterDoctorDTO[]; // Extract data array if wrapped in a success response
          } else {
            throw new Error('Unexpected API response format'); // Throw error for unexpected response
          }
        }),
        catchError(error => {
          console.error('Error fetching doctors by price range:', error);
          return throwError(error); // Rethrow the error
        })
      );
  }

  getDoctorsBySpecificAverageRate(avgRate: number): Observable<FilterDoctorDTO[]> {
    let params = new HttpParams().set('AvgRate', avgRate.toString());

    return this.http.get<any>(`${environment.baseUrl}/Doctor/FilteredDoctorBySpecificAverageRate`, { params })
      .pipe(
        map(response => {
          if (response.isSuccess && Array.isArray(response.data)) {
            console.log("res",response);

            return response.data as FilterDoctorDTO[];
          } else {
            throw new Error('Unexpected API response format');
          }
        }),
        catchError(error => {
          console.error('Error fetching doctors by specific average rate:', error);
          return throwError(error);
        })
      );
  }

  getTopRatedDoctors(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Doctor/TopRated`);
  }

  getDoctorEmail(doctorId: number): Observable<GeneralResponse> {
    return this.http.get<GeneralResponse>(`${environment.baseUrl}/Doctor/DoctorEmail`, {
      params: { DoctorId: doctorId.toString() }
    });
  }

}





