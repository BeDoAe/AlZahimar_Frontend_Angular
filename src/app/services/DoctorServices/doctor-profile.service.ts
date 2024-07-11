import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { DoctorGetDTO } from '../../models/Doctor/doctor-get-dto';
import { AvailableSlotsDTO } from '../../models/Doctor/available-slots-dto';
import { DoctorEditDTO } from '../../models/Doctor/doctor-edit-dto';
import { PatientNameDTO } from '../../models/Doctor/patient-name-dto';
import { GeneralResponse } from '../../models/Story/general-response';
import { RelativeDTO } from '../../models/Patient/relative-dto';
import { PatientDetailsDto } from '../../models/Doctor/patient-details-dto';

@Injectable({
  providedIn: 'root'
})
export class DoctorProfileService {
  private profileUrl = `${environment.baseUrl}/Doctor`; // Adjust URL as needed
  private availableSlotsUrl = `${environment.baseUrl}/Appointment/available-slotsDoctor`; // Endpoint for available slots
  private maxAverageRatingUrl = `${environment.baseUrl}/Rating/maxRatings`;

  private availableSlotsUrlrelative = `${environment.baseUrl}/Appointment/available-slotsRelative`;
  private doctorPatientsUrl = `${environment.baseUrl}/PatientDoctor/DoctorPatients`;
  private updatePhotoUrl = `${this.profileUrl}/UpdatePhoto`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(this.profileUrl);
  }

  getAvailableSlots(): Observable<{ isSuccess: boolean; data: AvailableSlotsDTO[] }> {
    return this.http.get<{ isSuccess: boolean; data: AvailableSlotsDTO[] }>(this.availableSlotsUrl);
  }

  getAvailableSlotsRelative(): Observable<{ isSuccess: boolean; data: AvailableSlotsDTO[] }> {
    return this.http.get<{ isSuccess: boolean; data: AvailableSlotsDTO[] }>(this.availableSlotsUrlrelative);
  }

  updateDoctorProfile(doctor: DoctorEditDTO): Observable<any> {
    return this.http.put<any>(this.profileUrl, doctor);
  }


  getMaxAverageRating() : Observable<any>{
    return this.http.get<any>(this.maxAverageRatingUrl);
  }

  getDoctorPatients(): Observable<{ isSuccess: boolean; data: PatientNameDTO[] }> {
    return this.http.get<{ isSuccess: boolean; data: PatientNameDTO[] }>(this.doctorPatientsUrl);
  }
  getRelativeProfile(patientId: number): Observable<GeneralResponse<RelativeDTO>> {
    return this.http.get<GeneralResponse<RelativeDTO>>(`${environment.baseUrl}/Relative/Visited/${patientId}`);

  }
  updateDoctorPhoto(image: File): Observable<GeneralResponse> {
    const formData = new FormData();
    formData.append('Image', image);
    return this.http.put<GeneralResponse>(this.updatePhotoUrl, formData);
  }
  getWorkAppointmentOfLoggedInDoctor(): Observable<GeneralResponse> {
    return this.http.get<GeneralResponse>(`${environment.baseUrl}/Doctor/WorkAppointmentOfLoggedInDoctor`);
  }
  updateWorkAppointment(workAppointment: any): Observable<GeneralResponse> {
    return this.http.put<GeneralResponse>(`${environment.baseUrl}/Doctor/StartEndDuratin`, workAppointment);
  }

  isDoctorPayment(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/Payment/IsDoctorPayment`);
  }

  // New method to initiate payment
  doctorPayment(): Observable<GeneralResponse<string>> {
    return this.http.post<GeneralResponse<string>>(`${environment.baseUrl}/Payment/DoctorPayment`, {});
  }
}

