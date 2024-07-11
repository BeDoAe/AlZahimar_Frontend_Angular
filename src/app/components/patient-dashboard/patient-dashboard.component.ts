import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../drawer/sidebar/sidebar.component";
import { AppointmentOfPatient } from '../../models/Patient/appointment-of-patient';
import { PatientService } from '../../services/PatientServices/patient.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PatientVisitedProfileService } from '../../services/PatientServices/patient-visited-profile.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-patient-dashboard',
    standalone: true,
    templateUrl: './patient-dashboard.component.html',
    styleUrl: './patient-dashboard.component.css',
    imports: [SidebarComponent,CommonModule,RouterLink]
})
export class PatientDashboardComponent implements OnInit  {

  appointments: AppointmentOfPatient[] = [];
  doctor: any = null;
  testReviews: any[] = [];
  reportsCount: number = 0;
  storyReviews: any[] = [];
  
  constructor(private patientService: PatientService,private patientVisitedProfileService:PatientVisitedProfileService) {}

  ngOnInit(): void {
       this.fetchUpcomingAppointment();
       this.checkDoctorOfPatient();
       this.fetchTestReviews();
       this.fetchReportsCount();
       this.fetchStoryReviews();
  }
  fetchStoryReviews(): void {
    this.patientService.getStoryReviews().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.storyReviews = response.data;
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'No Story Reviews Found',
            text: 'No story reviews found for the current patient.'
          });
        }
      },
      error: (error) => {
        console.error('Error fetching story reviews:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch story reviews. Please try again later.'
        });
      }
    });
  }
  fetchUpcomingAppointment(): void {
    this.patientService.getAppointmentsOfPatient().subscribe({
      next: (response) => {
        console.log(response);
        this.appointments = response.data;
      },
      error: (error) => {
        console.error('Error fetching upcoming appointment:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch upcoming appointment. Please try again later.'
        });
      }
    });
  }

  fetchReportsCount(): void {
    this.patientService.getReportsCountOfPatient().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.reportsCount = response.data; // Update reports count
          console.log("cc",this.reportsCount);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'No Reports Found',
            text: 'No reports found for the current patient.'
          });
        }
      },
      error: (error) => {
        console.error('Error fetching reports count:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch reports count. Please try again later.'
        });
      }
    });
  }


  fetchTestReviews(): void {
    this.patientService.getTestReviews().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.testReviews = response.data; // Store test review data
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'No Test Reviews Found',
            text: 'No test reviews found for the current patient.'
          });
        }
      },
      error: (error) => {
        console.error('Error fetching test reviews:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch test reviews. Please try again later.'
        });
      }
    });
  }

  checkDoctorOfPatient(): void {
    this.patientVisitedProfileService.getDoctorOfPatient().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.doctor = response.data; // Store doctor details
        } else {
          this.doctor = null; // No doctor found
        }
      },
      error: (error) => {
        console.error('Error fetching doctor of patient:', error);
        this.doctor = null;
      }
    });
  }

deleteDoctor(): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to unfollow this doctor?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, unfollow!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.patientService.deleteDoctorOfPatient().subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.doctor = null;
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Doctor has been unfollowed successfully.'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to unfollow the doctor.'
            });
          }
        },
        error: (error) => {
          console.error('Error unfollowing the doctor:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while trying to unfollow the doctor.'
          });
        }
      });
    }
  });
}

}
