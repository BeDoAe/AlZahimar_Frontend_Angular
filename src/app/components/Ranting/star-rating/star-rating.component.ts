import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  rating = 0;
  stars: boolean[] = Array(5).fill(false);

  rate(star: number) {
    this.rating = star;
    this.updateStars();
  }

  updateStars() {
    this.stars = this.stars.map((_, i) => i < this.rating);
  }
}
