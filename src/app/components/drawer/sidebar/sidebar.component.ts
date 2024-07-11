import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentTimesComponent } from "../../appointment-times/appointment-times.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    imports: [RouterLink, AppointmentTimesComponent,CommonModule,]
})
export class SidebarComponent {
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
