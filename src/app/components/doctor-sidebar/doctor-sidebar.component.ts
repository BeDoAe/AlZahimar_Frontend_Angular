import { RouterLink } from '@angular/router';
import { AppointmentTimesComponent } from '../appointment-times/appointment-times.component';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-doctor-sidebar',
  standalone: true,
  imports: [RouterLink, AppointmentTimesComponent,CommonModule,],
  templateUrl: './doctor-sidebar.component.html',
  styleUrl: './doctor-sidebar.component.css'
})
export class DoctorSidebarComponent {
  isActive = true;
  @Input() isAuthorizedToReserve: boolean = false;

  toggleSideitembar() {
    this.isActive = !this.isActive;
  }

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    }
  }
}
