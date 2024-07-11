import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DoctorDashBoardDto } from '../models/doctor-dash-board-dto';
import { DoctorDashboardService } from './DoctorServices/doctor-dashboard.service';
import { AppointmentsService } from './AppointmentsServices/appointments.service';
import { AppointmentDto } from '../models/Appointment/appointment-dto';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private countSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0); // Initialize with 0 or desired initial value
  private AcceptedAppointmentscountSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0); 
  private PendingAppointmentscountSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0); 
  
  
  constructor(private doctorDashboardService: DoctorDashboardService, private appointmentsService : AppointmentsService) {
    // Optionally, initialize count from statistics
    this.doctorDashboardService.getStatistics().subscribe({
      next: (res: { isSuccess: boolean; data: number }) => {
        if (res.isSuccess) {
          this.countSubject.next(res.data);
        }
      },
      error: (error: any) => {
        console.error('Error fetching initial statistics:', error);
      }
    });

    this.doctorDashboardService.getPendingRequestsCount().subscribe({
      next: (res: { isSuccess: boolean; data: number }) => {
        if (res.isSuccess) {
          this.PendingAppointmentscountSubject.next(res.data);
        }
      },
      error: (error: any) => {
        console.error('Error fetching initial Pending Appointments :', error);
      }
    });

    this.appointmentsService.GetAcceptAppointmentsCount().subscribe({
      next: (res: { isSuccess: boolean; data: number }) => {
        if (res.isSuccess) {
          this.countSubject.next(res.data);
          console.log(res.data);
        }
      },
      error: (error: any) => {
        console.error('Error fetching Accepted Appointments Count:', error);
      }
    });

  }

  getCount(): Observable<number> {
    return this.countSubject.asObservable();
  }

  incrementCount(): void {
    const currentValue = this.countSubject.value;
    console.log(this.countSubject.value);
    this.countSubject.next(currentValue + 1);

    console.log(currentValue);
    console.log(this.countSubject.value);
  }


  getAcceptedAppointmentsCount(): Observable<number> {
    return this.AcceptedAppointmentscountSubject.asObservable();
  }

  incrementAcceptedAppointmentsCount(): void {
    const currentValue = this.AcceptedAppointmentscountSubject.value;
    this.AcceptedAppointmentscountSubject.next(currentValue + 1);
  }



  getPendingAppointmentsCount(): Observable<number> {
    return this.PendingAppointmentscountSubject.asObservable();
  }

  DecrementPendingAppointmentsCount(): void {
    const currentValue = this.PendingAppointmentscountSubject.value;
    this.PendingAppointmentscountSubject.next(currentValue - 1);
  }




  decrementCount(): void {
    const currentValue = this.countSubject.value;
    this.countSubject.next(currentValue - 1);
  }
}
