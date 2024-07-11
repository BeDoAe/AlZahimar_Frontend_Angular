import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PatientDetailsDto } from '../../../models/Doctor/patient-details-dto';
import { DoctorProfileService } from '../../../services/DoctorServices/doctor-profile.service';
import { CommonModule } from '@angular/common';
import { DoctorDashboardService } from '../../../services/DoctorServices/doctor-dashboard.service';
import { DataSharingService } from '../../../services/data-sharing-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patients-requests',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './patients-requests.component.html',
  styleUrls: ['./patients-requests.component.css'] // Make sure the styleUrls path is correct
})
export class PatientsRequestsComponent implements OnInit {

  patients: PatientDetailsDto[] = [];
  filterPatients: PatientDetailsDto[] = [];
  errorMessage: string = '';
  environment: string = "http://localhost:2100";

  constructor(
    private doctorDashboardService: DoctorDashboardService,
    private dataSharingService: DataSharingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): void {
    this.doctorDashboardService.getPatientsRequests().subscribe({
      next: (response: { isSuccess: boolean; data: PatientDetailsDto[] }) => {
        if (response.isSuccess) {
          this.patients = response.data;
          this.filterPatients = this.patients;
          console.log(this.filterPatients);
          console.log("Patients Requests", this.patients);
        } else {
          console.error('Error: Unsuccessful response', response);
          this.errorMessage = 'Error fetching patients requests. Please try again later.';
        }
      },
      error: (error: any) => {
        console.error('Error fetching patients requests:', error);
        this.errorMessage = 'Error fetching patients requests. Please try again later.';
      }
    });
  }

  confirmRequest(requestId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to confirm this patient request?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#66BB6A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorDashboardService.confirmRequest(requestId).subscribe({
          next: (response: any) => {
            if (response.isSuccess) {
              console.log('Request accepted successfully');
              this.filterPatients = this.filterPatients.filter(patient => patient.id !== requestId);
              
              this.dataSharingService.incrementCount(); // Update count in DataSharingService
             
              Swal.fire({
                position: "center",
                icon: "success",
                title: 'Patient Request Confirmed',
                text: 'You have successfully confirmed the patient\'s request.',
                showConfirmButton: false,
                timer: 1500
              });
            } else {
              console.error('Error: Request acceptance failed', response);
            }
          },
          error: (error: any) => {
            console.error('Error confirming request:', error);
          }
        });
      }
    });
  }

  rejectRequest(requestId: number): void {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, decline it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorDashboardService.rejectRequest(requestId).subscribe({
          next: (response: any) => {
            if (response.isSuccess) {
              console.log('Request rejected successfully');
              this.filterPatients = this.filterPatients.filter(patient => patient.id !== requestId);
              Swal.fire({
                title: "Patient Request Declined",
                text: "You have successfully declined the patient's request.",
                icon: "success"
              });
            } else {
              console.error('Error: Request rejection failed', response);
            }
          },
          error: (error: any) => {
            console.error('Error rejecting request:', error);
          }
        });
      }
    });
  }

  patientDetails(patientId: number): void {
    console.log(patientId);
    this.router.navigateByUrl(`VisitedPatientprofile/${patientId}`);
  }
}
