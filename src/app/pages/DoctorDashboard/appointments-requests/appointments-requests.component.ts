import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppointmentDto } from '../../../models/Appointment/appointment-dto';
import { AppointmentsService } from '../../../services/AppointmentsServices/appointments.service';
import { CommonModule } from '@angular/common';
import { DataSharingService } from '../../../services/data-sharing-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments-requests',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './appointments-requests.component.html',
  styleUrl: './appointments-requests.component.css'
})
export class AppointmentsRequestsComponent implements OnInit {
  

  Appointments: AppointmentDto[] = [];
  filterAppointments : AppointmentDto[] = [];
  errorMessage: string = '';
  environment: string = "http://localhost:2100";

  constructor(private appointmentsService : AppointmentsService,
                private dataSharingService : DataSharingService,
                private router : Router,) {
  }

  ngOnInit(): void {
    this.GetPendingRequests();
  }
  
  GetPendingRequests(){
    this.appointmentsService.GetPendingRequests().subscribe({
      next : (response : { isSuccess: boolean; data: AppointmentDto[] }) => {
        this.Appointments = response.data;
        this.filterAppointments = this.Appointments;
        console.log("Pending Requests" , this.Appointments);
      },
      error : (error : any) =>{
        console.error('Error fetching pending Appointments requests:', error);
        this.errorMessage =  'Error fetching pending Appointments requests. Please try again later.';
      }
    })
  }
  

  confirmRequest(appointmentId: number): void {  
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to confirm this appointment request?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#66BB6A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentsService.AcceptAppointmentRequest(appointmentId).subscribe({
          next: (response: { isSuccess: boolean; data: string }) => {
            if (response.isSuccess) {
              console.log(response.data);
              console.log(response);
              this.filterAppointments = this.filterAppointments.filter(appointment => appointment.id !== appointmentId);
              this.dataSharingService.incrementAcceptedAppointmentsCount();
              this.dataSharingService.DecrementPendingAppointmentsCount();

              Swal.fire({
                position: "center",
                icon: "success",
                title: 'Appointment Request Confirmed',
                text: 'You have successfully confirmed the appointment request.',
                showConfirmButton: true,  
                //timer: 1500
              });
            } else {
              console.error('Error: Appointment request acceptance failed', response);
            }
          },
          error: (error: any) => {
            console.error('Error confirming appointment request:', error);
          }
        });
      }
    });
  }
  
  
  rejectRequest(appointmentId: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to decline this appointment request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, decline it!",
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentsService.RejectAppointmentRequest(appointmentId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              console.log(response.data);
              console.log(response);
              this.filterAppointments = this.filterAppointments.filter(appointment => appointment.id !== appointmentId);
              this.dataSharingService.DecrementPendingAppointmentsCount();
              
              Swal.fire({
                position: "center",
                icon: "success",
                title: 'Appointment Request Declined',
                text: 'You have successfully declined the appointment request.',
                showConfirmButton: true,
                //timer: 1500
              });
            } else {
              console.error('Error: Appointment request rejection failed', response);
            }
          },
          error: (error: any) => {
            console.error('Error rejecting appointment request:', error);
          }
        });
      }
    });
  }
  
  patientDetails(patientId : number) : void{
    console.log( "rrrrr",patientId);
    
    this.router.navigateByUrl(`VisitedPatientprofile/:${patientId}`);
  }


}
