import { Component } from '@angular/core';
import { LandingComponent } from '../../components/landing/landing.component';
import { DoctorSliderComponent } from '../../components/slider/slider.component';
import { AlzheimersInfoComponent } from '../../components/alzheimers-info/alzheimers-info.component';
import { AlzheimersQFAComponent } from '../../components/alzheimers-qfa/alzheimers-qfa.component';
import { GamesSliderComponent } from '../../components/games-slider/games-slider.component';
import { FooterComponent } from "../../components/Footer/footer/footer.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [LandingComponent, DoctorSliderComponent, AlzheimersInfoComponent, AlzheimersQFAComponent, GamesSliderComponent, FooterComponent]
})
export class HomeComponent {

}
