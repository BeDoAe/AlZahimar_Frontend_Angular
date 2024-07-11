import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AppointmentDto } from '../../models/Appointment/appointment-dto';
import { Observable } from 'rxjs';
import { AppointmentDateAndTimeDTO } from '../../models/Appointment/appointment-date-and-time-dto';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http : HttpClient) { }

  private GetPendingAppointmentsRequestsUrl = `${environment.baseUrl}/Appointment/Pending`;
  private AcceptedAppointmentsCountOfDoctorUrl = `${environment.baseUrl}/Appointment/AcceptedAppointmentsCountOfDoctor`;
  private PendingAppointmentsCountOfDoctorUrl = `${environment.baseUrl}/Appointment/PendingAppointmentsCountOfDoctor`;
  private RejectedAppointmentsCountOfDoctorUrl = `${environment.baseUrl}/Appointment/RejectedAppointmentsCountOfDoctor`;
  private AcceptAppointmentRequestUrl =  `${environment.baseUrl}/Appointment/accept`;
  private RejectAppointmentRequestUrl =  `${environment.baseUrl}/Appointment/reject`;
  private GetAcceptedAppointmentsUrl = `${environment.baseUrl}/Appointment/Accepted`;
  private DeleteAppointmentFromDoctorUrl =  `${environment.baseUrl}/Appointment/DeleteAppointmentById?appointmentId=`;
  private DeleteAppointmentUrl =  `${environment.baseUrl}/Appointment/DeleteAppointment`;

  GetPendingRequests() : Observable<{ isSuccess: boolean; data: AppointmentDto[] }>{
    return this.http.get<{isSuccess: boolean; data: AppointmentDto[]}>(this.GetPendingAppointmentsRequestsUrl);
  }

  GetAcceptedAppointments() : Observable<{ isSuccess: boolean; data: AppointmentDto[] }>{
    return this.http.get<{isSuccess: boolean; data: AppointmentDto[]}>(this.GetAcceptedAppointmentsUrl);
  }

  GetAcceptAppointmentsCount() : Observable<{ isSuccess: boolean; data: number }>{
    return this.http.get<{ isSuccess: boolean; data: number }>(this.AcceptedAppointmentsCountOfDoctorUrl);
  } 


  GetPendingAppointmentsCount() : Observable<{ isSuccess: boolean; data: number }>{
    return this.http.get<{ isSuccess: boolean; data: number }>(this.PendingAppointmentsCountOfDoctorUrl);
  } 

  GetRejectedAppointmentsCount() : Observable<{ isSuccess: boolean; data: number }>{
    return this.http.get<{ isSuccess: boolean; data: number }>(this.RejectedAppointmentsCountOfDoctorUrl);
  } 

  AcceptAppointmentRequest(appoinmentId : number) : Observable<{ isSuccess: boolean; data: string }>{
    return this.http.post<any>(`${this.AcceptAppointmentRequestUrl}/${appoinmentId}`, {});
  }

  
  RejectAppointmentRequest(appoinmentId : number) : Observable<{ isSuccess: boolean; data: string }>{
    return this.http.post<any>(`${this.RejectAppointmentRequestUrl}/${appoinmentId}`, {});
  }

  DeleteAppointmentFromDoctor(appointmentId: number): Observable<{ isSuccess: boolean; data: string }> {
    const url = `${environment.baseUrl}/Appointment/DeleteAppointmentById?appointmentId=${appointmentId}`;
    return this.http.delete<{ isSuccess: boolean; data: string }>(url);
  }

  DeleteAppointment(appointmentDateTimeDto: { date: string; time: string }): Observable<{ isSuccess: boolean; data: string }> {
    let params = new HttpParams()
      .set('appointmentDate', appointmentDateTimeDto.date)
      .set('appointmentTime', appointmentDateTimeDto.time);

    return this.http.delete<{ isSuccess: boolean; data: string }>(this.DeleteAppointmentUrl, { params });
  }
}
