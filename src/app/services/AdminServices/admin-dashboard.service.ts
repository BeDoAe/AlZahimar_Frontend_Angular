import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { DoctorDataDto } from '../../models/Doctor/doctor-data-dto';
//import { SidebarComponent } from '../../components/drawer/sidebar/sidebar.component';



@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private DoctorsCount = `${environment.baseUrl}/Doctor/DoctorsCount`;
  private PatientsCount = `${environment.baseUrl}/Patient/PatientsCount`;
  private DoctorsRequests = `${environment.baseUrl}/Account`;
  private confirmUrl = `${environment.baseUrl}/Account/accept`;
  private rejectUrl = `${environment.baseUrl}/Account/reject`;


  constructor(private http : HttpClient) { }

  getDoctorsCount() : Observable<{isSuccess: boolean; data : number}>{
      return this.http.get<{isSuccess: boolean, data : number}>(this.DoctorsCount);
  }

  getPatientsCount() : Observable<{isSuccess: boolean; data : number}>{
    return this.http.get<{isSuccess: boolean, data : number}>(this.PatientsCount);
}

getDoctorsRequests() : Observable<{isSuccess: boolean; data : DoctorDataDto[]}>{
  return this.http.get<{isSuccess: boolean; data : DoctorDataDto[]}>(this.DoctorsRequests);
}


confirmRequest(doctorId : number){
  return this.http.post<any>(`${this.confirmUrl}/${doctorId}` , {});
}

rejectRequest(doctorId : number){
  return this.http.post<any>(`${this.rejectUrl}/${doctorId}` , {});
}




}
