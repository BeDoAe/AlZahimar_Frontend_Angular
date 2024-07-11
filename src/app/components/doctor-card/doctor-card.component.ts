import { Component, Input, OnInit } from '@angular/core';
import { DoctorService } from '../../services/DoctorServices/doctor.service';
import { FilterDoctorDTO } from '../../models/Doctor/filter-doctor-dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowseSharedService } from '../../services/browse-shared.service';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../services/AuthenticationServices/auth.service';

@Component({
    selector: 'app-doctor-card',
    standalone: true,
    templateUrl: './doctor-card.component.html',
    styleUrls: ['./doctor-card.component.css'],
    imports: [CommonModule, RouterLink, StarRatingComponent,FormsModule,ReactiveFormsModule]
})
export class DoctorCardComponent implements OnInit {
  searchForm: FormGroup;
  isLoggedIn = false;
  // filteredDoctors: FilterDoctorDTO[] = [];

  @Input() filteredDoctors: FilterDoctorDTO[] = [];

  constructor(private fb: FormBuilder,
    private doctorService: DoctorService,
    private sharedService: BrowseSharedService,
    private authService: AuthService,

  ) {
    this.searchForm = this.fb.group({
      searchText: ['']
    });

  }

  ngOnInit() {
    this.loadDoctors(); // Initial load of all doctors
    this.watchSearchInput(); // Watch for changes in search input
    this.authService.loggedInUser$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      console.log("User is logged in:", this.isLoggedIn);
    });

  }
  getImageUrl(): string {
    return environment.ImgbaseUrl;
  }

  openEmailClient(event: Event, doctorId: number) {
    event.preventDefault(); // Prevent default anchor behavior
    this.doctorService.getDoctorEmail(doctorId).subscribe(
      (response) => {
        if (response.isSuccess) {
          const email = response.data;
          console.log(email);
          window.location.href = `mailto:${email}`;
        } else {
          console.error('Email not found');
        }
      },
      (error) => {
        console.error('Error fetching email:', error);
      }
    );
  }


  loadDoctors() {
    this.doctorService.getDoctors().subscribe(
      (response: FilterDoctorDTO[]) => {
        console.log("from load",response);
        this.filteredDoctors = response; // Update filteredDoctors with fetched data

      },
      (error) => {
        console.error('Error fetching doctors:', error); // Log error if fetch fails
      }
    );
  }

  watchSearchInput() {
    this.searchForm.get('searchText')?.valueChanges.subscribe(
      (value: string) => {
        if (value.trim() !== '') {
          this.searchDoctors(value.trim()); // Perform search if search text is not empty
        } else {
          this.loadDoctors(); // Reload all doctors if search text is empty
        }
      }
    );
  }

  searchDoctors(searchText: string) {
    this.doctorService.searchDoctorsByName(searchText).subscribe(
      (response: FilterDoctorDTO[]) => {
        this.filteredDoctors = response; // Update filteredDoctors with search results
      },
      (error) => {
        console.error('Error searching doctors:', error); // Log error if search request fails
      }
    );
  }
}

