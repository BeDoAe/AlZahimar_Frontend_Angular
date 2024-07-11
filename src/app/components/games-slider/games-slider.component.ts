import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-games-slider',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './games-slider.component.html',
  styleUrl: './games-slider.component.css'
})
export class GamesSliderComponent {
xoImage=`${environment.ImgbaseUrl}/images/xo.jpeg`
hangmanImage=`${environment.ImgbaseUrl}/images/hangman.png`
memoryCardsImage=`${environment.ImgbaseUrl}/images/memorybackground.jpg`

}
