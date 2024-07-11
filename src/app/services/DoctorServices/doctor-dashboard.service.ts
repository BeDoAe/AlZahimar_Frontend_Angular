import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PatientDetailsDto } from '../../models/Doctor/patient-details-dto';
import { Observable } from 'rxjs';  
import { DoctorDashBoardDto } from '../../models/doctor-dash-board-dto';
import { AppointmentDto } from '../../models/Appointment/appointment-dto';

@Injectable({
  providedIn: 'root'
})
export class DoctorDashboardService {

  private PatientsRequestsUrl = `${environment.baseUrl}/PatientDoctor/Requests`;
  private Statistics = `${environment.baseUrl}/Doctor/DoctorStatistics`;
  private ConfirmUrl = `${environment.baseUrl}/PatientDoctor/accept?requestId=`;
  private RejectUrl = `${environment.baseUrl}/PatientDoctor/reject?requestId=`;
  private PendingRequestsCountUrl = `${environment.baseUrl}/Appointment/PendingAppointmentsCountOfDoctor`;

  constructor(private http : HttpClient) { }

  // get patienst requests 
  getPatientsRequests() : Observable<{ isSuccess: boolean; data: PatientDetailsDto[] }>{

    return this.http.get<{isSuccess: boolean; data: PatientDetailsDto[]}>(this.PatientsRequestsUrl);
  }

  getStatistics() : Observable<{ isSuccess: boolean; data: number }>{
    return this.http.get<{ isSuccess: boolean; data: number}>(this.Statistics);
  }

  confirmRequest(requestId : number) : Observable<any>{
    return this.http.post<any>(`${this.ConfirmUrl}${requestId}`, {});
  }

  rejectRequest(requestId : number) : Observable<any>{
    return this.http.post<any>(`${this.RejectUrl}${requestId}`, {});
  }

  
  getPendingRequestsCount() : Observable<{ isSuccess: boolean; data: number }>{
    return this.http.get<{ isSuccess: boolean; data: number}>(this.PendingRequestsCountUrl);
  }




} 
 