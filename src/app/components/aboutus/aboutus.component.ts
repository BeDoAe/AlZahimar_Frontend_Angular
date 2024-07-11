import { Component } from '@angular/core';
import { CardComponent } from '../Card/card/card.component';
import { environment } from '../../../environments/environment.development';


@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CardComponent],

templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {
DotorImage=`${environment.ImgbaseUrl}/images/aboutdoctor.jpg`
}
