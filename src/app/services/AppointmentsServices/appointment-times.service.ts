import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponseForAvailableAppointments } from '../../models/Appointment/general-response-for-available-appointments';
import { environment } from '../../../environments/environment.development';
import { RequestAppointmentDTO } from '../../models/Appointment/request-appointment-dto';

@Injectable({
  providedIn: 'root'
})
export class AppointmentTimesService {

  constructor(private http: HttpClient) {}

  getAvailableAppointments(): Observable<GeneralResponseForAvailableAppointments> {
    return this.http.get<GeneralResponseForAvailableAppointments>(`${environment.baseUrl}/Appointment/AvailableAppointments`);
  }

  addAppointmentRequest(request: RequestAppointmentDTO): Observable<GeneralResponseForAvailableAppointments> {
    return this.http.post<GeneralResponseForAvailableAppointments>(`${environment.baseUrl}/Appointment`, request);
  }
}
