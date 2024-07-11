import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientVisitedProfileService {

  constructor(private http: HttpClient) {}
  getAllReports(PatientId:number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Report/FilteredReportsByDate/${PatientId}`);
  }
  viewReport(reportId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Report/Details/${reportId}`);
  }
  updateReport(reportId: number, updateReportDTO: any): Observable<any> {
    const params = new HttpParams().set('reportId', reportId.toString());
    return this.http.put<any>(`${environment.baseUrl}/Report/reportId`, updateReportDTO, { params });
  }

  deleteReport(reportId: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/Report/reportId`, {
      params: { reportId: reportId.toString() }
    });
  }

  getDoctorOfPatient(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/PatientDoctor/DoctorOfPatient`);
  }




  getLoggedInDoctorId(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Doctor/GetDoctor`);
  }
  addReport(patientId: number, reportDTO: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/Report/${patientId}`, reportDTO);
  }
}
