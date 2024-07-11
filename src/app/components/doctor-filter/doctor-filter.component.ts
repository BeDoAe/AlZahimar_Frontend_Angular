import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../../services/DoctorServices/doctor.service';
import { FilterDoctorDTO } from '../../models/Doctor/filter-doctor-dto';

@Component({
  selector: 'app-doctor-filter',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './doctor-filter.component.html',
  styleUrl: './doctor-filter.component.css'
})

export class DoctorFilterComponent implements OnInit {
  @Output() filteredDoctorsEvent = new EventEmitter<FilterDoctorDTO[]>();

  filterForm: FormGroup;
  stars = Array.from({ length: 5 }, (_, i) => ({ value: i + 1 }));
  selectedRating: number = 0;

  filteredDoctors: FilterDoctorDTO[] = [];
  @Input() allDoctors: FilterDoctorDTO[] = [];

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.filterForm = this.fb.group({
      rating: [''],
      jobLocationType: this.fb.group({
        gender: ['']
      }),
      Detectage: this.fb.group({
        age: ['']
      }),
      Detectprice: this.fb.group({
        price: ['']
      }),
      Detectrating: this.fb.group({
        rating: ['']
      }),
    });
  }

  ngOnInit(): void {
    this.fetchAllDoctors(); // Fetch all doctors initially
  }

  fetchAllDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (response: FilterDoctorDTO[]) => {
        this.allDoctors = response;
        this.applyFilters(); // Apply initial filters once data is fetched
      },
      (error) => {
        console.error('Error fetching all doctors:', error);
      }
    );
  }

  applyFilters(): void {
    let filteredResults = this.allDoctors;

    filteredResults = this.applyGenderFilter(filteredResults);
    filteredResults = this.applyAgeFilter(filteredResults);
    filteredResults = this.applyPriceFilter(filteredResults);
    filteredResults= this.applyAverageRateFilter(filteredResults)
    this.filteredDoctors = filteredResults;
    this.filteredDoctorsEvent.emit(this.filteredDoctors);
  }

  applyGenderFilter(doctors: FilterDoctorDTO[]): FilterDoctorDTO[] {
    const gender = this.filterForm.get('jobLocationType.gender')?.value;

    if (gender === 'female') {
      return doctors.filter(doc => doc.genderString === 'Female');
    } else if (gender === 'male') {
      return doctors.filter(doc => doc.genderString === 'Male');
    }

    return doctors; // Return original list if no gender filter selected
  }

  applyAgeFilter(doctors: FilterDoctorDTO[]): FilterDoctorDTO[] {
    const ageFilter = this.filterForm.get('Detectage.age')?.value;

    if (!ageFilter) {
      return doctors; // No age filter applied
    }

    if (ageFilter.includes('<')) {
      const ageValue = parseInt(ageFilter.replace('<', ''));
      return doctors.filter(doc => doc.age !== undefined && doc.age < ageValue);
    } else if (ageFilter.includes('>=')) {
      const ageValue = parseInt(ageFilter.replace('>=', ''));
      return doctors.filter(doc => doc.age !== undefined && doc.age >= ageValue);
    }

    return doctors; // Return original list if no valid age filter found
  }

  applyPriceFilter(doctors: FilterDoctorDTO[]): FilterDoctorDTO[] {
    const priceFilter = this.filterForm.get('Detectprice.price')?.value;

    if (priceFilter) {
      return doctors.filter(doc => doc.price <= parseInt(priceFilter));
    }

    return doctors; // Return original list if no price filter selected
  }

  applyAverageRateFilter(doctors: FilterDoctorDTO[]): FilterDoctorDTO[] {
    const avgRateFilter = this.filterForm.value.rating;

    if (avgRateFilter) {
      // Ensure avgRateFilter is a number before filtering
      const avgRate = parseFloat(avgRateFilter);
      return doctors.filter(doc => doc.averageRating !== undefined && doc.averageRating <= avgRate);
    }

    return doctors; // Return original list if no average rate filter selected
  }


  clearFilters(): void {
    // Reset form controls to their initial state
    this.filterForm.reset({
      rating: '',
      jobLocationType: { gender: '' },
      Detectage: { age: '' },
      Detectprice: { price: '' },
      Detectrating: { rating: '' }
    });

    // Fetch all doctors again and apply filters
    this.fetchAllDoctors();
  }

  rateDoctor(ratingValue: number): void {
    if (ratingValue === this.selectedRating) {
      this.selectedRating = 0; // Deselect the star if clicked again
    } else {
      this.selectedRating = ratingValue;
    }
    this.updateRatingFormControl();
    this.applyFilters();
  }
  private updateRatingFormControl(): void {
    // Update the hidden input value or any other logic you have for rating control
    this.filterForm.controls['rating'].setValue(this.selectedRating);
  }

   // Apply filters whenever rating changes
}


