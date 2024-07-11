import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/AppointmentsServices/appointments.service';
import { AppointmentDto } from '../../models/Appointment/appointment-dto';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../models/shared-module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments-weekly',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe, RouterLink, SharedModule],
  templateUrl: './appointments-weekly.component.html',
  styleUrl: './appointments-weekly.component.css'
})
export class AppointmentsWeeklyComponent implements OnInit {

  Appointments: AppointmentDto[] = [];
  filterAppointments: AppointmentDto[] = [];
  errorMessage: string = '';
  environment: string = "http://localhost:2100";

  constructor(private appointmentsService: AppointmentsService) { }

  ngOnInit(): void {
    this.GetAcceptedAppointments();
  }

  GetAcceptedAppointments() {
    this.appointmentsService.GetAcceptedAppointments().subscribe({
      next: (response: { isSuccess: boolean; data: AppointmentDto[] }) => {
        this.Appointments = response.data;
        this.filterAppointments = this.Appointments;
        console.log("Accepted Appointments", this.Appointments);
      },
      error: (error: any) => {
        console.error('Error fetching Accepted Appointments requests:', error);
        this.errorMessage = 'Error fetching Accepted Appointments requests. Please try again later.';
      }
    });
  }

  DeleteAppointments(appointmentId: number): void {
    this.appointmentsService.DeleteAppointmentFromDoctor(appointmentId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          console.log(response.data);
          console.log(response);
          this.filterAppointments = this.filterAppointments.filter(appointment => appointment.id !== appointmentId);

          Swal.fire({
            position: "center",
            icon: "success",
            title: 'Appointment Declined',
            text: 'You have successfully declined the appointment request.',
            showConfirmButton: true,
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
  openModal() {
    Swal.fire({
      title: "Submit Appointment Details",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Enter Date" type="date">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Enter Time" type="time">',
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const date = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const time = (document.getElementById('swal-input2') as HTMLInputElement).value;
        
        if (!date || !time) {
          Swal.showValidationMessage('Both fields are required');
          return;
        }
  
        // Convert time to 24-hour format
        const convertedTime = this.convertTo24HourFormat(time);
        console.log('Converted Time:', convertedTime);
  
        return { date, time: convertedTime };
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        const { date, time } = result.value;
        console.log('Date:', date);
        console.log('Time:', time);
        
        // Call service method to delete appointment
        this.appointmentsService.DeleteAppointment({ date, time }).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              // Handle success (e.g., show success message)
              Swal.fire({
                icon: 'success',
                title: 'Appointment Deleted',
                text: 'Appointment deleted successfully.'
              });
              // Optionally, update UI or fetch data again
            } else {
              // Handle failure (e.g., show error message)
              Swal.fire({
                icon: 'error',
                title: 'Failed to Delete Appointment',
                text: response.data // Error message from backend
              });
            }
          },
          error: (error) => {
            // Handle error (e.g., show error message)
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while deleting the appointment.'
            });
            console.error('Error deleting appointment:', error);
          }
        });
      }
    });
  }
  
  // Helper function to convert time to 24-hour format
  convertTo24HourFormat(time: string): string {
    const [hours, minutes] = time.split(':');
    let hours24 = parseInt(hours, 10);
  
    if (time.includes('PM') && hours24 < 12) {
      hours24 += 12;
    } else if (time.includes('AM') && hours24 === 12) {
      hours24 = 0;
    }
  
    const paddedHours = hours24.toString().padStart(2, '0');
    return `${paddedHours}:${minutes}:00`;
  }
  
}
