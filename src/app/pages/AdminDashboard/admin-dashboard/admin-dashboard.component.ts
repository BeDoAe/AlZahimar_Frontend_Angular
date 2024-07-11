import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/drawer/sidebar/sidebar.component';
import { DonightChartComponent } from "../../../components/DonughtChart/donight-chart/donight-chart.component";
import { CommonModule } from '@angular/common';
import { DoctorDataDto } from '../../../models/Doctor/doctor-data-dto';
import { AdminDashboardService } from '../../../services/AdminServices/admin-dashboard.service';
import { responsiveFontSizes } from '@mui/material';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [SidebarComponent, DonightChartComponent, CommonModule]
})
export class AdminDashboardComponent implements OnInit {

  Doctors : DoctorDataDto[] = [];
  filterDoctors : DoctorDataDto[] = [];
  errorMessage : string = '';
  patientsCount! : number;
  doctorsCount! : number;
  environment: string = "http://localhost:2100";

  constructor(private adminDashboardService : AdminDashboardService, private router : Router) {
     
  }
  ngOnInit(): void {
    this.getDoctorsRequests();
    this.getPatientsCount();
    this.getDoctorsCount();

  }

  getDoctorsRequests(): void {
    this.adminDashboardService.getDoctorsRequests().subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          console.log(response.data);
          this.Doctors = response.data;
          this.filterDoctors = this.Doctors;
        } else {
          console.error('Error: Unsuccessful response', response);
          this.errorMessage = 'Error fetching doctors requests. Please try again later.';
        }
      },
      error: (error: any) => {
        console.error('Error fetching doctors requests:', error);
        this.errorMessage = 'Error fetching doctors requests. Please try again later.';
      }
    });
  }

  getPatientsCount(){
    this.adminDashboardService.getPatientsCount().subscribe({
      next : (response) => {
        console.log(response);
        this.patientsCount = response.data;
      },
      error : (response) => {
        console.error('Error: Unsuccessful response', response);
        this.errorMessage = 'Error fetching patients count. Please try again later.';
      }
      
    })
  }

  getDoctorsCount(){
    this.adminDashboardService.getDoctorsCount().subscribe({
      next : (response) => {
        console.log(response);
        this.doctorsCount = response.data;
      },
      error : (response) => {
        console.error('Error: Unsuccessful response', response);
        this.errorMessage = 'Error fetching doctors count. Please try again later.';
      }
      
    })
  }

  confirmRequest(doctorId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to confirm this doctor request?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#66BB6A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminDashboardService.confirmRequest(doctorId).subscribe({
          next: (response: any) => {
            if (response.isSuccess) {
              console.log('Request accepted successfully');
              this.filterDoctors = this.filterDoctors.filter(doctor => doctor.id !== doctorId);
              this.refreshCounts();
              Swal.fire({
                position: "center",
                icon: "success",
                title: 'Doctor Request Confirmed',
                text: 'You have successfully confirmed the doctor\'s request.',
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
  
  rejectRequest(doctorId: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to decline this doctor request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, decline it!",
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminDashboardService.rejectRequest(doctorId).subscribe({
          next: (response: any) => {
            if (response.isSuccess) {
              console.log('Request rejected successfully');
              this.filterDoctors = this.filterDoctors.filter(doctor => doctor.id !== doctorId);
              Swal.fire({
                position: "center",
                icon: "success",
                title: 'Doctor Request Declined',
                text: 'You have successfully declined the doctor\'s request.',
                showConfirmButton: false,
                timer: 1500
              });
            } else {
              console.error('Error: Request reject failed', response);
            }
          },
          error: (error: any) => {
            console.error('Error rejecting request:', error);
          }
        });
      }
    });
  }
  

  refreshCounts(): void {
    this.getDoctorsCount();
    this.getPatientsCount();
  }
  
  doctorDetails(doctorId : number){
    console.log(doctorId);
    this.router.navigateByUrl(`VisitedDoctorprofile/:${doctorId}`);
  }


  }

