import { Component } from '@angular/core';


import { DoctorSliderComponent } from '../slider/slider.component';
import { DoctorCardComponent } from '../doctor-card/doctor-card.component';
import { DoctorFilterComponent } from '../doctor-filter/doctor-filter.component';
import { FilterDoctorDTO } from '../../models/Doctor/filter-doctor-dto';
import { DoctorService } from '../../services/DoctorServices/doctor.service';

@Component({
    selector: 'app-browse-doctors',
    standalone: true,
    templateUrl: './browse-doctors.component.html',
    styleUrl: './browse-doctors.component.css',
    imports: [DoctorFilterComponent, DoctorCardComponent, DoctorSliderComponent]
})
export class BrowseDoctorsComponent {
  
//   filteredDoctors: FilterDoctorDTO[] = [];

//   updateFilteredDoctors(doctors: FilterDoctorDTO[]): void {
//     this.filteredDoctors = doctors;
// }

allDoctors: FilterDoctorDTO[] = [];
  filteredDoctors: FilterDoctorDTO[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadAllDoctors();
  }

  loadAllDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (response: FilterDoctorDTO[]) => {
        this.allDoctors = response;
        this.filteredDoctors = response; // Initially display all doctors
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  updateFilteredDoctors(doctors: FilterDoctorDTO[]): void {
    this.filteredDoctors = doctors;
  }


}


