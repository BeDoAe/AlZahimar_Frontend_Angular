import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/DoctorServices/doctor.service';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../services/AuthenticationServices/auth.service';

declare var bootstrap: any;

@Component({
    selector: 'app-slider',
    standalone: true,
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css'],
    imports: [RouterLink, CommonModule, StarRatingComponent]
})
export class DoctorSliderComponent implements OnInit, AfterViewInit {
  topRatedDoctors: any[] = [];
  chunkedDoctors: any[][] = [];
  isLoggedIn = false;
  userRole: string | null = null;
  
  @ViewChild('carousel', { static: true }) carouselElement!: ElementRef;

  constructor(private doctorService: DoctorService,  private authService: AuthService,) {}

  ngOnInit(): void {
    this.doctorService.getTopRatedDoctors().subscribe(response => {
      if (response.isSuccess) {
        this.topRatedDoctors = response.data;
        this.chunkDoctors();
        this.refreshCarousel();
      }
    });

    this.authService.loggedInUser$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      console.log("User is logged in:", this.isLoggedIn);
    });
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      console.log("Role:", this.userRole);
    });
  }

  getImageUrl(): string {
    return environment.ImgbaseUrl;
  }

  ngAfterViewInit(): void {
    this.refreshCarousel();
  }

  chunkDoctors(): void {
    this.chunkedDoctors = [];
    for (let i = 0; i < this.topRatedDoctors.length; i += 3) {
      this.chunkedDoctors.push(this.topRatedDoctors.slice(i, i + 3));
    }
  }

  refreshCarousel(): void {
    const carousel = new bootstrap.Carousel(this.carouselElement.nativeElement, {
      interval: 5000,
      ride: 'carousel'
    });
    carousel.cycle();
  }

  getStarsArray(rating: number): number[] {
    const validRating = Math.max(0, Math.min(5, Math.floor(rating))); // Ensure rating is between 0 and 5
    return Array(validRating).fill(0).map((_, index) => index);
  }
}
