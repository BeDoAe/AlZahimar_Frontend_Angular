import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvailableAppointment } from '../../models/Appointment/available-appointment';
import { AppointmentTimesService } from '../../services/AppointmentsServices/appointment-times.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment-times',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-times.component.html',
  styleUrl: './appointment-times.component.css'
})
export class AppointmentTimesComponent implements OnInit {
  availableAppointments: AvailableAppointment[] = [];

  selectedDate: string | null = null;
  selectedTime: string | null = null;

  constructor(private appointmentTimesService: AppointmentTimesService) {}

  ngOnInit(): void {
    this.appointmentTimesService.getAvailableAppointments().subscribe(response => {
      if (response.isSuccess) {
        this.availableAppointments = response.data;
      }
    });
  }


  bookAppointment(date: string, time: string): void {
    this.selectedDate = date;
    this.selectedTime = time;

    Swal.fire({
      title: 'Are You Sure that You want to Reserve?',
      input: 'text',
      inputLabel: 'Reason for appointment',
      inputPlaceholder: 'Enter your reason here...',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
    //  denyButtonText: `Don't save`
    }).then(result => {
      if (result.isConfirmed) {
        const request = {
          appointmentDate: this.selectedDate as string,
          appointmentTime: this.selectedTime as string,
          reason: result.value || ''
        };

        this.appointmentTimesService.addAppointmentRequest(request).subscribe(response => {
          if (response.isSuccess) {
            Swal.fire('Saved!', '', 'success');
          } else {
            Swal.fire('Error!', 'Could not save the appointment.', 'error');
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
